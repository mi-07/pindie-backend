const gamesRouter = require("./games");
const usersRouter = require("./users");
const categoriesRouter = require("./categories");
const authRouter = require("./auth");

const apiRouter = require("express").Router();

// Импорты и инициализация главного роута
apiRouter.use("/api", usersRouter);
apiRouter.use("/api", gamesRouter);
apiRouter.use("/api", categoriesRouter);
apiRouter.use("/api", authRouter);

module.exports = apiRouter;
