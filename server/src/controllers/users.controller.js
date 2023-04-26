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
      return res.status(404).send({ message: "El usuario no existe" });
    }
    const user = jsonData.find((item) => item.userId === req.params.id);
    res.send(user);
  });
};

// Eliminar usuario por ID

controller.deleteUser = (req, res) => {
  fs.readFile(USERS, (err, data) => {
    if (err) res.status(500).send({ message: "Error al leer el archivo" });
    const jsonData = JSON.parse(data);
    const userExists = jsonData.some((item) => item.userId === req.params.id);
    if (!userExists) {
      return res.status(404).send({ message: "El usuario no existe" });
    }
    const indexToDelete = jsonData.findIndex(
      (item) => item.userId === req.params.id
    );
    jsonData.splice(indexToDelete, 1);
    fs.writeFile(USERS, JSON.stringify(jsonData), (err, data) => {
      if (err)
        return res.status(500).send({ message: "Error al guardar el archivo" });
      res.status(202).send({ message: "Usuario eliminado con éxito" });
    });
  });
};

module.exports = controller;
