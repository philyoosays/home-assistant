require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const dataRouter = require('./server/router');
const authRouter = require('./auth/AuthRouter');
const controller = require('./server/controller');
const tokenService = require('./auth/TokenService');

const app = express();
const PORT = process.env.PORT || 2001;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(tokenService.receiveToken);
app.use(controller.verifySite)

app.use('/api', dataRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});

module.exports = app;