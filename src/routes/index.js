const express = require('express');
const router = express.Router({ mergeParams: true });

const userController 	= require('../controllers/user');

module.exports = function() {

    app.post('/addUser', userController.addUser);
	app.post('/updateUser', userController.updateUser);
	app.post('/getUser', userController.getUser);

	app.post('/AddNominee', userController.AddNominee);
	app.post('/UpdateNominee', userController.UpdateNominee);
	app.post('/UserNominee', userController.UserNominee);
	app.post('/UserNomineeByUsers', userController.UserNomineeByUsers);

}


