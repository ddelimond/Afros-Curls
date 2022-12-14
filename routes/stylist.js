const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const stylistController = require('../controllers/stylistController')

router.get('/', stylistController)







module.exports = router