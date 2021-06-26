const route = require("express").Router();
const { userController, docsController } = require("../controllers");

//user routes
route.post('/sign-up', userController.sign_up);
route.post('/login-in', userController.sign_in);


//docs routes
route.get('/:ID', docsController.getAllDocs);
route.post('/postdoc/:ID', docsController.addDoc);

module.exports = route;