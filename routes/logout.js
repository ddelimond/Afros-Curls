const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const logOutController = require('../controllers/logoutController')

router.post('/', logOutController)



















module.exports = router