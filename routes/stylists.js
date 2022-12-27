const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const stylistController = require('../controllers/stylistController')

router.get('/', stylistController.goToStylist)
router.get('/microsoft_login', stylistController.goToStylistMS)








module.exports = router