// const { readData, writeData } = require("../utils/data");

// const getAllGames = async (req, res, next) => {
//   const games = await readData("./data/games.json");
//   if (!games) {
//     res.status(400);
//     res.send({
//       status: "error",
//       message: "Нет игр в базе данных. Добавьте игру.",
//     });
//     return;
//   }
//   req.games = games;
//   next();
// };

// const checkIsTitleInArray = (req, res, next) => {
//   req.isNew = !Boolean(req.games.find((item) => item.title === req.body.title));
//   next();
// };

// const updateGamesArray = (req, res, next) => {
//   if (req.isNew) {
//     const inArray = req.games.map((item) => Number(item.id));
//     let maximalId;
//     if (inArray.length > 0) {
//       maximalId = Math.max(...inArray);
//     } else {
//       maximalId = 0;
//     }

//     req.updatedObject = {
//       id: maximalId + 1,
//       title: req.body.title,
//       image: req.body.image,
//       link: req.body.link,
//       description: req.body.description,
//     };
//     req.games = [...req.games, req.updatedObject];
//     next();
//   } else {
//     res.status(400);
//     res.send({ status: "error", message: "Игра с таким именем уже есть." });
//   }
// };

// const updateGamesFile = async (req, res, next) => {
//   await writeData("./data/games.json", req.games);
//   next();
// };

// const findGameById = (req, res, next) => {
//   const id = Number(req.params.id);
//   req.game = req.games.find((item) => item.id === id);
//   next();
// };

// const deleteGame = (req, res, next) => {
//   const id = req.game.id;
//   const index = req.games.findIndex((item) => item.id === id);
//   req.games.splice(index, 1);
//   next();
// };

// module.exports = {
//   getAllGames,
//   checkIsTitleInArray,
//   updateGamesArray,
//   updateGamesFile,
//   findGameById,
//   deleteGame,
// };

const games = require("../models/game");

const findAllGames = async (req, res, next) => {
  console.log("GET /games");
  req.gamesArray = await games.find({}).populate("categories").populate({
    path: "users",
    select: "-password",
  });
  console.log(req.gamesArray);
  next();
};

const findGameById = async (req, res, next) => {
  try {
    req.game = await games.findById(req.params.id).populate("games").populate({
      path: "users",
      select: "-password",
    });
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(404)
      .send(JSON.stringify({ message: "Игра не найдена | Game Not Found" }));
  }
};

const createGame = async (req, res, next) => {
  console.log("POST /games");
  try {
    console.log(req.body);
    req.game = await games.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Ошибка создания игры | Error creating game",
        error: error,
      })
    );
  }
};

const updateGame = async (req, res, next) => {
  try {
    // В метод передаём id из параметров запроса и объект с новыми свойствами
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({
          message: "Ошибка обновления игры | Error updating game",
        })
      );
  }
};

const deleteGame = async (req, res, next) => {
  try {
    // Методом findByIdAndDelete по id находим и удаляем документ из базы данных
    req.game = await games.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({
          message: "Ошибка удаления игры | Error deleting game",
        })
      );
  }
};

const checkEmptyFields = async (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
  ) {
    // Если какое-то из полей отсутствует, то не будем обрабатывать запрос дальше,
    // а ответим кодом 400 — данные неверны.
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Заполни все поля | Fill all fields" }));
  } else {
    // Если всё в порядке, то передадим управление следующим миддлварам
    next();
  }
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
  // Проверяем наличие жанра у игры
if (!req.body.categories || req.body.categories.length === 0) {
  res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "Выбери хотя бы одну категорию | Choose at least one category" }));
} else {
  next();
}
};

const checkIfUsersAreSafe = async (req, res, next) => {
  // Проверим, есть ли users в теле запроса
if (!req.body.users) {
  next();
  return;
}
// Cверим, насколько изменился массив пользователей в запросе
// с актуальным значением пользователей в объекте game
// Если больше чем на единицу, вернём статус ошибки 400 с сообщением
if (req.body.users.length - 1 === req.game.users.length) {
  next();
  return;
} else {
  res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя | You can't delete users or add more than one" }));
}
}; 

const checkIsGameExists = async (req, res, next) => {
  // Среди существующих в базе игр пытаемся найти игру с тем же именем,
  // с которым хотим создать новую игру
  const isInArray = req.gamesArray.find((game) => {
    return req.body.title === game.title;
  });
  // Если нашли совпадение, то отвечаем кодом 400 и сообщением
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Игра с таким названием уже существует | Game with this name already exists" }));
  } else {
  // Если игра, которую хотим создать, действительно новая, то передаём управление дальше
    next();
  }
};

module.exports = {
  findAllGames,
  findGameById,
  createGame,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIfUsersAreSafe,
  checkIsGameExists,
};
