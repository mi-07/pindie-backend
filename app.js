const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const gamesRouter = require("./routes/games");
const cors = require("./middlewares/cors");
const connectToDatabase = require("./database/connect");
// const categoriesRouter = require("./routes/categories");
// const usersRouter = require("./routes/users");
const apiRouter = require("./routes/apiRouter");

const PORT = 3000;
const app = express();

connectToDatabase();

app.use(
  cors,
  bodyParser.json(),
  apiRouter, //> Добавляем
  express.static(path.join(__dirname, "public")),
  /* gamesRouter, */ //> Удаляем
  /* categoriesRouter, */ //> Удаляем
  /*usersRouter */ //> Удаляем
);

// Запуск приложения
app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
  console.log('Time:', Date.now());
});
