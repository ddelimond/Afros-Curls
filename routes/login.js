const express = require('express');
const passport = require('passport');
const router = express.Router()
const loginController = require('../controllers/loginController');


router.get('/', loginController.goToLogInForm)
router.post('/', loginController.logUserIn)




module.exports = router;