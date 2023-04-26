const controller = require("../controllers/users.controller");
const express = require("express");
const usersRoutes = express.Router();

usersRoutes.get("/", controller.allUsers);
usersRoutes.get("/:id", controller.userById);
usersRoutes.delete("/:id", controller.deleteUser);
usersRoutes.post("/", controller.createUser);
usersRoutes.patch("/:id", controller.updateUser);

module.exports = usersRoutes;
