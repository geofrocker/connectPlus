const env = require('./env.json');

exports.config = () => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  return env[nodeEnv];
};
