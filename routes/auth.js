const epxress = require('express')
const passport = require('passport')
const router = epxress.Router()



// @desc  auth withgoogle 
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc  google with callback  
// @route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/dashboard')
    }
)



module.exports = router