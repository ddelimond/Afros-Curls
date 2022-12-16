const express = require('express')
const router = express.Router()
const lookbookController = require('../controllers/lookbookController')

router.use('/', lookbookController.goToLookbooks)