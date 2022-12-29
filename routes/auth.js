
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
    (req, res, next) => {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,
                resourceURL: config.resourceURL,
                customState: 'my_state',
                failureRedirect: '/login'
            }
        )(req, res, next);
    },
    (req, res) => {
        console.log('Login was called in the Sample');
        res.redirect('/dashboard');
    });

router.post('/microsoft/callback',
    (req, res, next) => {
        passport.authenticate('azuread-openidconnect',
            {
                response: res,
                failureRedirect: '/login'
            }
        )(req, res, next);
    },
    (req, res) => {
        console.log('We received a return from AzureAD.');
        res.redirect('/dashboard');
    });




module.exports = router