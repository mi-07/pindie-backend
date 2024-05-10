const gamesRouter = require("express").Router();
const { sendAllGames } = require("../controllers/games.js");
const {findAllGames} = require("../middlewares/games.js");

gamesRouter.get("/games", findAllGames, sendAllGames);

module.exports = gamesRouter;
