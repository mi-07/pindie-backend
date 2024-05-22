const user = require("../models/user");
const users = require("../models/user");

const findAllUsers = async (req, res, next) => {
  console.log("GET /users");
  req.usersArray = await users.find({});
  console.log(req.gamesArray);
  next();
};

const findUserById = async (req, res, next) => {
  console.log("GET /users/:id");
  try {
    req.user = await users.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(404)
      .send(
        JSON.stringify({ message: "Пользователь не найден | User Not Found" })
      );
  }
};

const createUser = async (req, res, next) => {
  console.log("POST /users");
  try {
    console.log(req.body);
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Ошибка создания пользователя | Error creating user",
        error: error,
      })
    );
  }
};

const updateUser = async (req, res, next) => {
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
          message: "Ошибка обновления пользователя | Error updating user",
        })
      );
  }
};

const deleteUser = async (req, res, next) => {
  console.log("DELETE /users/:id");
  try {
    // В метод передаём id из параметров запроса
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({
          message: "Ошибка удаления пользователя | Error deleting user",
        })
      );
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Введите имя, email и пароль | Please enter name, email and password" }));
  } else {
    next();
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (req.body.name === "" || req.body.email === "") {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Введите имя и email | Please enter name and email" }));
  } else {
    next();
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Пользователь с таким email уже существует | User with this email already exists" }));
  } else {
    next();
  }
};

module.exports = { findAllUsers, findUserById, createUser, updateUser, deleteUser, checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail, checkIsUserExists };
