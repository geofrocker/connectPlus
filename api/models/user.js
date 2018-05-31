const mongoose = require('mongoose');
const bcrpt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Name field is required'],
    validate: [/^[A-Za-z0-9_-]{4,}$/, 'Invalid name'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    validate: [/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/, 'Invalid email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
  },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'UpVote' }],

});

const User = module.exports = mongoose.model('user', UserSchema);

module.exports.createUser = function (newUser, callback) {
  bcrpt.genSalt(10, (err, salt) => {
    bcrpt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByUsername = function (username, callback) {
  const query = { username };
  User.findOne(query, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrpt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

