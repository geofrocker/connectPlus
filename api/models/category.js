const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({

  name: {
    type: String,
    required: [true, 'title field is required'],
    validate: [/^[A-Za-z0-9_-]{4,}$/, 'Invalid name'],
  },
  description: {
    type: String,
    required: [true, 'Description field is required'],
    validate: [/^[A-Za-z0-9_-]{4,}$/, 'Invalid description'],
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The author is required'],
  },
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
});
CategorySchema.plugin(mongoosePaginate);
CategorySchema.index({ '$**': 'text' });

const Category = module.exports = mongoose.model('category', CategorySchema);

module.exports.getCategoryById = function (_id, callback) {
  const query = { _id };
  Category.findOne(query, callback);
};

module.exports.deleteCategoryById = function (_id, callback) {
  const query = { _id };
  Category.remove(query, callback);
};

module.exports.updateCategoryById = function (_id, body, callback) {
  const query = { _id };
  Category.update(query, body, callback);
};
