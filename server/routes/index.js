const route = require("express").Router();
const { userController } = require("../controllers");

route.post('/', userController);

module.exports = route;