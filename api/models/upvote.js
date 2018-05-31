const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UpVoteSchema = new Schema({
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
const UpVote = module.exports = mongoose.model('upvote', UpVoteSchema);
