const path = require("path");
const USERS = path.resolve(__dirname, "../../data/users.json");
const fs = require("fs");
const { v4 } = require("uuid");
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

// Crear usuario

controller.createUser = (req, res) => {
  fs.readFile(USERS, (err, data) => {
    if (err) res.status(500).send({ message: "Error al leer el archivo" });
    const jsonData = JSON.parse(data);
    const newUser = req.body;
    // Comprobar email duplicado
    const emailExists = jsonData.some((item) => item.email === newUser.email);
    if (emailExists) {
      return res
        .status(409)
        .send({ message: "Ya existe un usuario con el mismo email" });
    }
    // Comprobar nombre usuario duplicado
    const usernameExists = jsonData.some(
      (item) => item.username === newUser.username
    );
    if (usernameExists) {
      return res
        .status(409)
        .send({ message: "Ya existe un usuario con el mismo nombre" });
    }

    newUser.userId = v4();
    jsonData.push(newUser);

    fs.writeFile(USERS, JSON.stringify(jsonData), (err, data) => {
      if (err)
        return res.status(500).send({ message: "Error al guardar el archivo" });
      res.status(201).send({ message: "Usuario creado con éxito" });
    });
  });
};

module.exports = controller;
