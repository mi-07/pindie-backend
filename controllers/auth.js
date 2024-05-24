const users = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;

  users
    .findUserByCredentials(email, password)
    .then((user) => {
      // Здесь происходит генерация токена
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: 3600,
      });
    })
    .then((user, token) => {
      res
        .status(200)
        .send({ _id: user._id, username: user.username, email: user.email, jwt: token });
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};

module.exports = { login };
