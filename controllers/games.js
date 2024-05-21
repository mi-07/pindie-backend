// const sendAllGames = async (req, res) => {
//   res.send(req.games);
// };

// const sendUpdatedGames = (req, res) => {
//   res.send({
//     games: req.games,
//     updated: req.updatedObject,
//   });
// };

// module.exports = {
//   sendAllGames,
//   sendUpdatedGames,
// };

const sendAllGames = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.gamesArray));
};

const sendGameCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};

const sendGameById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};

const sendGameUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res
    .status(200)
    .send(JSON.stringify({ message: "Игра обновлена | Game updated" }));
};

const sendGameDeleted = (req, res) => {
  // Объект игры отправляем в формате JSON
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
};

module.exports = {
  sendAllGames,
  sendGameById,
  sendGameCreated,
  sendGameUpdated,
  sendGameDeleted,
};
