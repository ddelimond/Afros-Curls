const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const aboutController = require('../controllers/aboutController')

router.get('/', aboutController.goToAbout)
router.get('/microsoft_login', aboutController.goToAboutMS)




module.exports = router