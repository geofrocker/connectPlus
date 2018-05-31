const Review = require('../models/review');
const Recipe = require('../models/recipe');

const ReviewController = () => {
  const addReview = (req, res) => {
    req.body.author = req.userId;
    req.body.recipe = req.params.id;
    const review2 = new Review(req.body);
    // const recipe = Recipe.getRecipeById(req.params.id);
    Recipe.getRecipeById(req.params.id, (err, recipe) => {
      Review.create(req.body).then((review) => {
        recipe.reviews.push(review2);
        recipe.save();
        res.send(review);
      }).catch((err2) => {
        res.status(422).send({ error: err2.message });
      });
      recipe.reviews.push(review2);
      recipe.save();
    });
  };

  const getReview = (req, res) => {
    Review.getReviewById(req.params.id, (err, review) => {
      if (err) throw err;
      if (!review) {
        res.send({ message: 'Review not found' });
      }
      res.send(review);
    });
  };

  const deleteReview = (req, res) => {
    Review.getReviewById(req.params.id, (err, review) => {
      if (!review) {
        res.send({ message: 'Review not found' });
      }
      if (review.author === req.userId) {
        Review.deleteReviewById(req.params.id, (err2, review2) => {
          if (!err2) {
            res.send({ message: 'Review deleted Successfully', review2 });
          }
        });
      } else {
        res.send({ message: 'You can only delete reviews you have authored' });
      }
    });
  };

  const updateReview = (req, res) => {
    Review.getReviewById(req.params.id, (err, review) => {
      if (!review) {
        res.send({ message: 'Review not found' });
      }
      if (review.author === req.userId) {
        req.body.author = req.userId;
        Review.updateReviewById(req.params.id, req.body, (err2, review2) => {
          if (!err) {
            res.send({ message: 'Review updated successfully', review2 });
          }
        });
      } else {
        res.send({ message: 'You can only update reviews you have authored' });
      }
    });
  };

  return {
    addReview,
    getReview,
    deleteReview,
    updateReview,
  };
};
module.exports = ReviewController;
