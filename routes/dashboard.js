const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const dashboardController = require('../controllers/dashboardController')



router.get('/', dashboardController.goToDashboard)













module.exports = router 