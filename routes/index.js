const express = require('express')
const route = express.Router()
const DashboardController = require('../controllers/DashboardController')

route.get('/', (req, res) => {
    res.render('welcome')
})


// Dashboard
route.get('/dashboard', DashboardController.getDasboard)

module.exports = route