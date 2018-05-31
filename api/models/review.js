const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  content: {
    type: String,
    required: [true, 'The content is required'],
    validate: [/^[A-Za-z0-9_ -]{2,100}$/, 'Invalid content'],
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});


const Review = module.exports = mongoose.model('review', ReviewSchema);


module.exports.getReviewById = function (_id, callback) {
  const query = { _id };
  Review.findOne(query, callback);
};

module.exports.deleteReviewById = function (_id, callback) {
  const query = { _id };
  Review.remove(query, callback);
};

module.exports.updateReviewById = function (_id, body, callback) {
  const query = { _id };
  Review.update(query, body, callback);
};

