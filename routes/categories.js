const categoriesRouter = require("express").Router();

const {
  findAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory
} = require("../middlewares/categories");
const {
  sendAllCategories,
  sendCategoryCreated,
  sendCategoryById,
  sendCategoryUpdated,
  sendCategoryDeleted
} = require("../controllers/categories");

categoriesRouter.get("/categories", findAllCategories, sendAllCategories);
categoriesRouter.post(
  "/categories",
  findAllCategories,
  createCategory,
  sendCategoryCreated,
  sendCategoryUpdated
);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);
categoriesRouter.put(
  "/categories/:id", // Слушаем запросы по эндпоинту
  updateCategory, // Обновляем запись в MongoDB
  sendCategoryUpdated // Возвращаем ответ на клиент
); 

categoriesRouter.delete("/categories/:id", deleteCategory, sendCategoryDeleted);

module.exports = categoriesRouter;
