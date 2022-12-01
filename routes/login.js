const express = require('express');
const router = express.Router()
const loginController = require('../controllers/loginController');


router.get('/', loginController.logIn)
router.post('/', loginController.auth)




module.exports = router;