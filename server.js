require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const dataRouter = require('./server/router');
const controller = require('./server/controller');
// const authRouter = require('./auth/AuthRouter');
// const tokenService = require('./auth/TokenService');

const app = express();
const PORT = 6001;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

// app.use(tokenService.receiveToken);
// app.use(controller.verifySite)

app.use('/api', dataRouter);
// app.use('/')
// app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});

module.exports = app;
