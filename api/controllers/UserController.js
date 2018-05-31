const jwt = require('jsonwebtoken');
const config = require('../../config/');
const User = require('../models/user');

const UserController = () => {
  const register = (req, res) => {
    const newUser = new User(req.body);
    User.createUser(newUser, (err, user) => {
      if (err) res.status(422).send({ error: err.message }); console.log(err);
      res.send(user);
    });
  };

  const login = (req, res) => {
    User.getUserByUsername(req.body.username, (err, user) => {
      if (err) throw err;
      if (!user) {
        res.send({ message: 'unknown User' });
      }
      User.comparePassword(req.body.password, user.password, (err2, isMatch) => {
        if (err2) throw err2;
        if (!isMatch) {
          res.send({ message: 'invalid password' });
        }
      });
      jwt.sign({ user }, config.env.SECRET_KEY, { expiresIn: '2d' }, (error, token) => {
        if (err) throw err;
        res.json({ token });
      });
    });
  };
  return {
    register,
    login,
  };
};
module.exports = UserController;
