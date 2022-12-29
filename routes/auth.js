
const epxress = require('express')
const passport = require('passport')
const router = epxress.Router()
const config = require('../config/microsoftConfig')



// @desc  auth withgoogle 
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc  google with callback  
// @route GET /auth/google/callback
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/dashboard')
    }
)
router.get('/twitter',
    passport.authenticate('twitter'));

router.get('/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });


router.get('/microsoft',
    passport.authenticate('microsoft', {
        // Optionally define any authentication parameters here
        // For example, the ones in https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow

        prompt: 'select_account',
    }));

router.get('/microsoft/callback',
    passport.authenticate('microsoft', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });




module.exports = router