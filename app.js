const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("./middlewares/cors");
const connectToDatabase = require("./database/connect");
const apiRouter = require("./routes/apiRouter");
const cookieParser = require("cookie-parser");

const pagesRouter = require("./routes/pages");


// Конфигурация приложения
const PORT = 3001;
const app = express();
connectToDatabase();

// Импорт и инициализация роутов
app.use(
  cors,
  cookieParser(), //> Добавляем миддлвар для работы с куки
  bodyParser.json(),
  pagesRouter, // Добавляем роутер для страниц
  apiRouter, //> Добавляем
  express.static(path.join(__dirname, "public"))
);

// Запуск приложения
app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
  console.log("Time:", Date.now());
});
