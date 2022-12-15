const express = require('express')
const router = express.Router()
const lookbookController = require('../routes/')

router.use('/', lookbookController.goToLookbooks)