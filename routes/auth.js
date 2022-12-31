
const epxress = require('express')
const passport = require('passport')
const router = epxress.Router()




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
    passport.authenticate('microsoft'));

router.get('/microsoft/callback',
    passport.authenticate('microsoft', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

router.get('/facebook',
    passport.authenticate('facebook', { scope: [profile] }));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: '/dashboard',
        failureRedirect: "/login"
    })
);




module.exports = router