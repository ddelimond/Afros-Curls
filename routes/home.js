const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')


router.get('/', homeController.goHome)
router.get('/microsoft_login', homeController.goHomeMS)

module.exports = router;
