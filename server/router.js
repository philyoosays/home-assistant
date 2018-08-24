const express = require('express');
const router = express.Router();

const controller = require('./controller');
const resHandler = require('./resHandler');
const speechCenter = require('./SpeechCenter');
// const tokenService = require('../auth/TokenService');

router.route('/ping')
  .get(
    controller.pingCell
  )

router.route('/analyze')
  .post(

  )

module.exports = router;
