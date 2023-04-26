const controller = require("../controllers/users.controller");
const express = require("express");
const usersRoutes = express.Router();

usersRoutes.get("/", controller.allUsers);
usersRoutes.get("/:id", controller.userById);

module.exports = usersRoutes;
