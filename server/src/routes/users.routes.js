const controller = require("../controllers/users.controller");
const express = require("express");
const usersRoutes = express.Router();

usersRoutes.get("/", controller.allUsers);
usersRoutes.get("/:id", controller.userById);
usersRoutes.delete("/:id", controller.deleteUser);

module.exports = usersRoutes;
