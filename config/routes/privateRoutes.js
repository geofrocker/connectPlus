module.exports = {
  'GET /category': 'CategoryController.getCategories',
  'POST /category': 'CategoryController.addCategory',
  'GET /category/:id': 'CategoryController.getCategory',
  'DELETE /category/:id': 'CategoryController.deleteCategory',
  'PUT /category/:id': 'CategoryController.updateCategory',
  'GET /recipe': 'RecipeController.getRecipes',
  'POST /recipe': 'RecipeController.addRecipe',
  'GET /recipe/:id': 'RecipeController.getRecipe',
  'DELETE /recipe/:id': 'RecipeController.deleteRecipe',
  'PUT /recipe/:id': 'RecipeController.updateRecipe',
  'POST /recipe/review/:id': 'ReviewController.addReview',
  'GET /recipe/review/:id': 'ReviewController.getReview',
  'DELETE /recipe/review/:id': 'ReviewController.deleteReview',
  'PUT /recipe/review/:id': 'ReviewController.updateReview',


};
