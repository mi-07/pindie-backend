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

module.exports = {
  findAllGames,
  findGameById,
  createGame,
  updateGame,
  deleteGame
};
