const Category = require('../models/category');
const User = require('../models/user');

const CategoryController = () => {
  const addCategory = (req, res) => {
    req.body.author = req.userId;
    Category.create(req.body).then((category) => {
      res.send(category);
    }).catch((err) => {
      console.log(err);
      res.status(422).send({ error: err.message });
    });
  };

  const getCategories = (req, res) => {
    let q;
    if (req.query.q) {
      q = new RegExp(`^${req.query.q}`, 'i');
    }
    const { page } = req.query;
    const limit = parseInt(req.query.limit, 10);
    Category.paginate({ name: q || /./ }, { page: page || 1, limit: limit || 500, populate: { path: 'author', model: User } }, (err, categories) => {
      if (err) throw err;
      categories.hasNext = categories.docs.length + categories.offset > categories.total;
      categories.hasPrevious = categories.offset > 0;
      res.send(categories);
    });
  };

  const getCategory = (req, res) => {
    Category.getCategoryById(req.params.id, (err, category) => {
      if (err) throw err;
      if (!category) {
        res.send({ message: 'Category not found' });
      }
      res.send(category);
    });
  };

  const deleteCategory = (req, res) => {
    Category.deleteCategoryById(req.params.id, (err, category) => {
      if (!category.n) {
        res.send({ message: 'Category not found' });
      }
      if (!err) {
        res.send({ message: 'Category deleted Successfully', category });
      }
    });
  };

  const updateCategory = (req, res) => {
    req.body.author = req.userId;
    Category.updateCategoryById(req.params.id, req.body, (err, category) => {
      if (err) throw err;
      if (!category) {
        res.send({ message: 'Category not found' });
      }
      if (!err) {
        res.send({ message: 'Category updated successfully', category });
      }
    });
  };

  return {
    addCategory,
    getCategories,
    getCategory,
    deleteCategory,
    updateCategory,
  };
};
module.exports = CategoryController;
