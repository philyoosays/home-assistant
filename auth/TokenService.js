require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  makeToken(payload) {
    return new Promise((resolve, reject) =>
      jwt.sign(
        payload,
        process.env.SERVER_SECRET,
        {
          expiresIn: '7d',
          issuer:    'ERIviaYoo',
        },
        (err, data) => err ? reject(err) : resolve(data),
      ),
    );
  },

  async verify(req, res, next) {
    let payload = await jwt.verify(
      req.authToken,
      process.env.SERVER_SECRET,
      (error, decoded) => {
        if(error){
          res.json({ error: true })
        }
        if(decoded) {
          console.log(decoded)
          res.locals.payload = {...decoded};
          req.body.username = decoded.user;
          next();
        }
      }
    );
  },

  receiveToken(req, res, next) {
    if (req.headers.authorization) {
      req.authToken = req.headers.authorization.replace(/^Bearer\s/, '');
    }
    next();
  },

  decode(token) {
    return jwt.decode(token);
  },
};
