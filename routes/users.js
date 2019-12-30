const express = require('express')
const route = express.Router()

// Register page
route.get('/register', (req, res) => {
    res.render('register')
})
// Register handler
route.post('/register', (req, res) => {
    console.log('Hello => ', req.body)
})

// login Page
route.get('/login', (req, res) => {
    res.render('login')
})
// Login Handler
route.get('/login', (req, res) => {
    res.render('login')
})

module.exports = route