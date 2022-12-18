const express = require('express')
const router = express.Router()
const lookbookController = require('../controllers/lookbookController')

router.get('/', lookbookController.goToLookbook)

module.exports = router