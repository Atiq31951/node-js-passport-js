const express = require('express')
const route = express.Router()
const UserRegistrationController = require('../controllers/User/RegistrationController')
const UserLoginController = require('../controllers/User/LoginController')

// Register page
route.get('/register', UserRegistrationController.GetRegistrationController)
route.post('/register', UserRegistrationController.PostRegistrationController)

// login Page
route.get('/login', UserLoginController.GetLoginController)
route.post('/login', UserLoginController.PostLoginController)

module.exports = route