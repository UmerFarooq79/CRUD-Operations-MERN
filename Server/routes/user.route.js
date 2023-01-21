const express = require('express')
let userModel = require('../models/user.model');
const UserCtrl = require('../UserController/userController'); 

const app = express();
const userRoute = express.Router();

//Get Users List
userRoute.route('/').get(UserCtrl.list)

// Add new User

userRoute.route('/addUser').post(UserCtrl.create)

//Get User Details by User Id

userRoute.route('/user/:id').get(UserCtrl.read)

//Update User Details

userRoute.route('/updateUser/:id').post(UserCtrl.update)

// Delete User

userRoute.route('/deleteUser/:id').get(UserCtrl.remove)

userRoute.param('id', UserCtrl.userByID);
module.exports= userRoute;