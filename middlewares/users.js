const users = require("../models/user");

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({});
  console.log(req.gamesArray);
  next();
};

module.exports = { findAllUsers };
