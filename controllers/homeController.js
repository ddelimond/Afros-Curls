


module.exports = {
    goHome: (req, res) => {
        if (req.isAuthenticated()) { res.render('signedIn/home') } else {
            res.render('signedOut/home')
        }
    },
    goHomeMS: (req, res) => {
        if (req.isAuthenticated()) { res.render('signedInMS/home') } else {
            res.render('signedOut/home')
        }
    }
}