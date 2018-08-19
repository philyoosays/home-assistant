require('dotenv').config();
const model = require('./models');
// const func = require('./utilities');

module.exports = {

  verifySite(req, res, next) {
    if(req.headers.secrethandshake === process.env.REACT_APP_SECRET) {
      console.log('authorized api hit');
      next();
    } else {
      console.log('not authorized')
      res.send('not authorized')
    }
  },
}
