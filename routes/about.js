const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const aboutController = require('../controllers/aboutController')

router.get('/', aboutController)




module.exports = router