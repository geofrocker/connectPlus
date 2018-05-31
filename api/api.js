const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const mapRoutes = require('express-routes-mapper');

const mongoose = require('mongoose');
const config = require('../config/');
const auth = require('./policies/auth.policy');

const app = express();
mongoose.connect(config.env.DB);

console.log(config.env);

// const conn_new_app = mongoose.createConnection('mongodb://localhost/weConnect');
// mongoose.connect('mongodb://<geofrocker>:<elizei2>@ds113169.mlab.com:13169/yummy-recipes');

mongoose.Promise = global.Promise;
const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'api/controllers/');

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

app.use(bodyParser.json());

// secure your private routes with jwt authentication middleware
app.all('/private/*', (req, res, next) => auth(req, res, next));

// fill routes for express appliction
app.use('/public', mappedOpenRoutes);
app.use('/private', mappedAuthRoutes);

module.exports = app;

