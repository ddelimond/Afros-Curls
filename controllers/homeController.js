


module.exports = {
    goHome: (req, res) => {
        if (req.isAuthenticated()) { res.render('signedIn/home') } else {
            res.render('signedOut/home')
        }
    }
}