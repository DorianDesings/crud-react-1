const path = require("path");
const USERS = path.resolve(__dirname, "../../data/users.json");
const fs = require("fs");
const controller = {};

// Devolver todos los usuarios

controller.allUsers = (req, res) => {
  fs.readFile(USERS, (err, data) => {
    if (err) res.status(500).send({ message: "Error al leer el archivo" });
    const jsonData = JSON.parse(data);
    return res.send(jsonData);
  });
};

// Devolver usuario por ID

controller.userById = (req, res) => {
  fs.readFile(USERS, (err, data) => {
    if (err) res.status(500).send({ message: "Error al leer el archivo" });
    const jsonData = JSON.parse(data);
    const userExists = jsonData.some((item) => item.userId === req.params.id);
    if (!userExists) {
      res.status(404).send({ message: "El usuario no existe" });
    }
    const user = jsonData.find((item) => item.userId === req.params.id);
    return res.send(user);
  });
};

module.exports = controller;
