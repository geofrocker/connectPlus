const Recipe = require('../models/recipe');
const User = require('../models/user');
const Review = require('../models/review');

const RecipeController = () => {
  const addRecipe = (req, res) => {
    req.body.author = req.userId;
    Recipe.create(req.body).then((recipe) => {
      res.send(recipe);
    }).catch((err) => {
      console.log(err);
      res.status(422).send({ error: err.message });
    });
  };

  const getRecipes = (req, res) => {
    let q;
    if (req.query.q) {
      q = new RegExp(`^${req.query.q}`, 'i');
    }
    const { page } = req.query;
    const limit = parseInt(req.query.limit, 10);
    // Recipe.find().populate({ path: 'reviews', model: Review }).exec((err, recipes) => {
    Recipe.paginate({ title: q || /./ }, { page: page || 1, limit: limit || 500, populate: { path: 'reviews', model: Review } }, (err, recipes) => {
      if (err) throw err;
      recipes.hasNext = recipes.docs.length + recipes.offset > recipes.total;
      recipes.hasPrevious = recipes.offset > 0;
      res.send(recipes);
    });
  };

  const getRecipe = (req, res) => {
    Recipe.getRecipeById(req.params.id, (err, recipe) => {
      if (err) throw err;
      if (!recipe) {
        res.send({ message: 'Recipe not found' });
      }
      res.send(recipe);
    });
  };

  const deleteRecipe = (req, res) => {
    Recipe.deleteRecipeById(req.params.id, (err, recipe) => {
      if (!recipe.n) {
        res.send({ message: 'Recipe not found' });
      }
      if (!err) {
        res.send({ message: 'Recipe deleted Successfully', recipe });
      }
    });
  };

  const updateRecipe = (req, res) => {
    req.body.author = req.userId;
    Recipe.updateRecipeById(req.params.id, req.body, (err, recipe) => {
      if (err) throw err;
      if (!recipe) {
        res.send({ message: 'Recipe not found' });
      }
      if (!err) {
        res.send({ message: 'Recipe updated successfully', recipe });
      }
    });
  };

  return {
    addRecipe,
    getRecipes,
    getRecipe,
    deleteRecipe,
    updateRecipe,
  };
};
module.exports = RecipeController;
