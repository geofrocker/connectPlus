const jwt = require('jsonwebtoken');
const config = require('../../config/');

module.exports = (req, res, next) => {
  console.log('We are here');
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    return jwt.verify(req.token, config.env.SECRET_KEY, (err, authData) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userId = authData.user._id;
      req.username = authData.user.username;
      req.email = authData.user.email;
      return next();
    });
  }
  return res.sendStatus(403);
};
