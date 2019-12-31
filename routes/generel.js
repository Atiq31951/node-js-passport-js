const express = require('express')
const route = express.Router()
const GeneralController = require('../controllers/GeneralController')

route.get('email-check', GeneralController.CheckEmailUnique)
route.get('phone-check', GeneralController.CheckPhoneUnique)

module.exports = route