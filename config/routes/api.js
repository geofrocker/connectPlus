// const mongoose = require('mongoose');
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const Category = require('../models/category');

// const router = express.Router();

// // Register users
// router.post('/auth/register', (req, res) => {
//   const newUser = new User(req.body);
//   User.createUser(newUser, (err, user) => {
//     if (err) res.status(422).send({ error: err.message }); console.log(err);
//     res.send(user);
//   });
// });
// // Login users
// router.post('/auth/login', (req, res) => {
//   User.getUserByUsername(req.body.username, (err, user) => {
//     if (err) throw err;
//     if (!user) {
//       res.send({ message: 'unknown User' });
//     }
//     User.comparePassword(req.body.password, user.password, (err, isMatch) => {
//       if (err) throw err;
//       if (!isMatch) {
//         res.send({ message: 'invalid password' });
//       }
//     });
//     jwt.sign({ user }, 'secretKey', { expiresIn: '2d' }, (error, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   });
// });

// const verifyToken = (req, res, next) => {
//   const bearerHeader = req.headers.authorization;
//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(' ');
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     jwt.verify(req.token, 'secretKey', (err, authData) => {
//       if (err) {
//         res.sendStatus(403);
//       } else {
//         req.userId = authData.user._id;
//         req.username = authData.user.username;
//         req.email = authData.user.email;
//         next();
//       }
//     });
//   } else {
//     res.sendStatus(403);
//   }
// };

// router.post('/category', verifyToken, (req, res) => {
//   req.body.author = req.userId;
//   Category.create(req.body).then((category) => {
//     res.send(category);
//   }).catch((err) => {
//     console.log(err);
//     res.status(422).send({ error: err.message });
//   });
// });

// router.get('/category', verifyToken, (req, res) => {
//   Category.find({}).populate({ path: 'author', model: User }).exec((err, categories) => {
//     if (err) throw err;
//     res.send(categories);
//   });
// });


// module.exports = router;
