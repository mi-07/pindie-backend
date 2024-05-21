const categories = require("../models/category");

const findAllCategories = async (req, res, next) => {
  console.log("GET /categories");
  req.categoriesArray = await categories.find({});
  console.log(req.categoriesArray);
  /* console.log("findAllCategories", "|", res, "|", req); */ //> Не делай это — пожалеешь! | don't do this!
  /*console.log( ["findAllCategories", JSON.stringify(res), JSON.stringify(req)].join(" | ") ); */ //> И это тоже! | and this too!
  console.log(
    "findAllCategories",
    "|",
    res.setHeader,
    "|",
    req.categoriesArray,
    "|",
    req.params,
    "|",
    req.query
  );
  next();
};

const findCategoryById = async (req, res, next) => {
  try {
    req.category = await categories.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(404)
      .send(
        JSON.stringify({ message: "Категория не найдена | Category Not Found" })
      );
  }
};

const createCategory = async (req, res, next) => {
  console.log("POST /categories");
  try {
    console.log(req.body);
    req.сategory = await categories.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Ошибка создания категории | Error creating category",
        error: error,
      })
    );
  }
};

const updateCategory = async (req, res, next) => {
  try {
    // В метод передаём id из параметров запроса и объект с новыми свойствами
    req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({
          message: "Ошибка обновления категории | Error updating category",
        })
      );
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({
          message: "Ошибка удаления категории | Error deleting category",
        })
      );
  }
};

module.exports = {
  findAllCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
