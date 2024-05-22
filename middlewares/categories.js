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
  console.log("GET /categories/:id");
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
    req.category = await categories.create(req.body);
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
    res.status(400).send(
      JSON.stringify({
        message: "Ошибка обновления категории | Error updating category",
      })
    );
  }
};

const deleteCategory = async (req, res, next) => {
  console.log("DELETE /categories/:id");
  try {
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Ошибка удаления категории | Error deleting category",
      })
    );
  }
};

const checkIsCategoryExists = async (req, res, next) => {
  // Среди существующих в базе категорий пытаемся найти категорию с тем же именем,
  // с которым хотим создать новую категорию
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  // Если нашли совпадение, то отвечаем кодом 400 и сообщением
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({
          message:
            "Категория с таким названием уже существует | Category with this name already exists",
        })
      );
  } else {
    // Если категория, которую хотим создать, действительно новая, то передаём управление дальше
    next();
  }
};

const checkEmptyName = async (req, res, next) => {
  if (req.body.name === "") {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({
          message:
            "Нужно ввести название категории | You need to enter a category name",
        })
      );
  } else {
    next();
  }
};

module.exports = {
  findAllCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  checkIsCategoryExists,
  checkEmptyName,
};
