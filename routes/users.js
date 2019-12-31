const express = require('express')
const route = express.Router()
const UserController = require('../controllers/User/RegistrationController')

// Register page
route.get('/register', UserController.GetRegistrationController)
// Register handler
route.post('/register', UserController.PostRegistrationController)

// login Page
route.get('/login', (req, res) => {
    res.render('login')
})
// Login Handler
route.get('/login', (req, res) => {
    res.render('login')
})

module.exports = route