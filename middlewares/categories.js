const categories = require("../models/category");

const findAllCategories = async (req, res, next) => {
  req.categoriesArray = await categories.find({});
  console.log(req.categoriesArray);
  next();
};

module.exports = findAllCategories;
