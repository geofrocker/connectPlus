const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const User = require('./user');
const Category = require('./category');
const Review = require('../models/review');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: [true, 'title field is required'],
    validate: [/^[A-Za-z0-9_ -]{4,100}$/, 'Invalid title'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  steps: {
    type: String,
    required: [true, 'Steps are required'],
    validate: [/^[A-Za-z0-9_ -]{4,100}$/, 'Invalid steps'],
  },
  ingredients: {
    type: String,
    required: [true, 'Ingredients field is required'],
    validate: [/^[A-Za-z0-9_ -]{4,100}$/, 'Invalid ingredients'],
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    validate: [/^[A-Za-z]{4,8}$/, 'Invalid status'],
    default: 'public',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  dateModified: {
    type: Date,
    default: Date.now(),
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'UpVote' }],

});
RecipeSchema.plugin(mongoosePaginate);
RecipeSchema.index({ '$**': 'text' });
// RecipeSchema.virtual('reviews', {
//   ref: Review,
//   localField: '_id',
//   foreignField: 'recipe',
// });

const Recipe = module.exports = mongoose.model('recipe', RecipeSchema);

module.exports.getRecipeById = function (_id, callback) {
  const query = { _id };
  Recipe.findOne(query).populate('author', 'username', User).populate('category', 'name', Category).exec(callback);
};

module.exports.deleteRecipeById = function (_id, callback) {
  const query = { _id };
  Recipe.remove(query, callback);
};

module.exports.updateRecipeById = function (_id, body, callback) {
  const query = { _id };
  Recipe.update(query, body, callback);
};
