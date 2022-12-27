const express = require('express')
const router = express.Router()
const lookbookController = require('../controllers/lookbookController')

router.get('/', lookbookController.goToLookbook)
router.get('/microsoft_login', lookbookController.goToLookbookMS)

module.exports = router