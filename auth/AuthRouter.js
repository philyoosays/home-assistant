const express = require('express')

const authService = require('./AuthService');
const tokenService = require('./TokenService');
const resHandler = require('../server/resHandler');
const controller = require('../server/controller');

const app = express.Router();

app.route('/addallowed')
  .post(
    controller.verifySite,
    tokenService.verify,
    controller.addAllowedUser,
    resHandler.sendJSON
  )

app.route('/register')
  .post(
    controller.verifySite,
    authService.validRegistrant,
    authService.markTaken,
    authService.doesUserExist,
    authService.generatePassword,
    authService.registerUser,
    authService.isValidUser,
    authService.authenticate,
    resHandler.handleUserLogin,
  )

app.route('/token')
  .get(
    tokenService.verify,
    authService.doesUserExist,
    resHandler.sendJSON
  )

app.route('/username')
  .post(
    controller.verifySite,
    authService.doesUserExist,
    resHandler.sendJSON
  )

app.route('/preauth')
  .post(
    controller.verifySite,
    authService.validRegistrant,
    resHandler.sendJSON
  )

app.route('/login')
  .post(
    controller.verifySite,
    authService.isValidUser,
    authService.authenticate,
    resHandler.handleUserLogin,
  )

module.exports = app;
