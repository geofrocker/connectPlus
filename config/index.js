const privateRoutes = require('./routes/privateRoutes');
const publicRoutes = require('./routes/publicRoutes');
const env = require('./env.json');

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  keep: false,
  privateRoutes,
  publicRoutes,
  env: env[nodeEnv],
};
