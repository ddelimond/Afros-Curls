const express = require('express')
const router = express.Router()
const lookbookController = require('../controllers/lookbookController')

router.get('/', lookbookController.goToLookbooks)

module.exports = router