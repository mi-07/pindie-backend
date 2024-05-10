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

module.exports = { sendAllGames };
