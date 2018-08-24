require('dotenv').config();
const ping = require('ping');
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

  pingCell(req, res, next) {
    ping.sys.probe('192.168.1.10', function(isAlive){
      if(isAlive) {
        res.json('Yes')
      } else {
        res.json('No')
      }
    });
  }

}
