const express = require('express');
const router = express.Router()
const loginController = require('../controllers/loginController');


router.get('/', loginController.goToLogInForm)
router.post('/', loginController.login)




module.exports = router;