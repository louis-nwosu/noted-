const route = require("express").Router();
const { userController, docsController } = require("../controllers");

//user routes
route.post('/sign-up', userController.sign_up); 
route.post('/log-in', userController.sign_in);


//document routes 
route.get('/:ID', docsController.getAllDocs);
route.post('/postdoc/:ID', docsController.addDoc);
route.get('/get-doc/:id', docsController.getAllDocsInDay);
route.post('/get-single-doc/:date/:id', docsController.getSingleDoc);

//app settings route

module.exports = route;