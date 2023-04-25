const controller = require("../controllers/users.controller");
const express = require("express");
const usersRoutes = express.Router();

usersRoutes.get("/", controller.allUsers);

module.exports = usersRoutes;
