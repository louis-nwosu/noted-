const route = require("express").Router();
const { userController, docsController } = require("../controllers");

//user routes
route.post('/sign-up', userController.sign_up);
route.post('/login-in', userController.sign_in);


//docs routes
route.get('/:ID', docsController.getAllDocs);
route.post('/postdoc/:ID', docsController.addDoc);
route.get('/get-doc/:id', docsController.getAllDocsInDay);
route.get('/get-single-doc/:id', docsController.getSingleDoc);

module.exports = route;