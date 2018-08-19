const bcrypt = require('bcrypt');
const model = require('../server/models');
const TokenService = require('./TokenService');

module.exports = {
  async isValidUser(req, res, next) {
    try {
      const user = await model.findOneUser(req.body.username);
      console.log('user', user)
      if(Array.isArray(user)) {
        res.locals.user = user[0];
      } else {
        res.locals.user = user;
      }
      res.locals.ispassgood = await bcrypt.compare(req.body.password, res.locals.user.pass_digest);
      next()
    } catch (err) {
      console.error(err);
    }
  },

  async generatePassword(req, res, next) {
    const { password } = req.body;
    console.log('gen pass')
    await bcrypt.hash(password, 11)
      .then( (hash) => {
        res.locals.user = req.body;
        res.locals.user.pass_digest = hash;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },

  validRegistrant(req, res, next) {
    console.log(req.body)
    model.findPreAuthUser(req.body.email)
      .then(data => {
        if(data.length === 0) {
          res.json({
            valid: false,
            taken: false
          });
        } else if(data[0].taken === true) {
          res.json({
            valid: false,
            taken: true
          });
        } else {
          console.log('data: ', data[0])
          res.locals.role = data[0].role;
          res.locals.preAuthEmail = data[0].email;
          next();
        }
      })
  },

  markTaken(req, res, next) {
    model.markPreAuthTaken(res.locals.preAuthEmail)
    .then(data => {
      next()
    })
    .catch(err => {
      next(err)
    })
  },

  doesUserExist(req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    model.findOneUser(req.body.username)
      .then(data => {
        if(data.length !== 0){
          res.locals.userExists = true;
          next();
        } else {
          res.locals.userExists = false;
          next()
        }
      })
      .catch(err => {
        next(err);
      })
  },

  registerUser(req, res, next) {
    res.locals.user.role = res.locals.role;
    model.addUser(res.locals.user)
      .then( (data) => {
        next();
      })
      .catch((err) => {
        next(err);
      })
  },

  authenticate(req, res, next) {
    if (res.locals.ispassgood === false) {
      return next({});
    }
    TokenService.makeToken({
      role: res.locals.user.account_type,
      id: res.locals.user.id,
      user: res.locals.user.username
    })
      .then((token) => {
        res.locals.token = token;
        next();
      })
      .catch(next);
        return false;
  },

  allow({ roles }) {
    return [
      (req, res, next) => {
        TokenService.verify(req.authToken)
          .then((payload) => {
            const isAuthorized = roles.some(n => payload.roles.includes(n));
            return isAuthorized ? next() : Promise.reject('User not authorized');
          })
          .catch(next);
      },
      (err, req, res, next) => {
        console.log(err);
        res.status(403).json({});
      },
    ];
  },

  killArray(user) {
    if(Array.isArray(user)) {
      return user[0];
    } else {
      return user;
    }
  }
};
