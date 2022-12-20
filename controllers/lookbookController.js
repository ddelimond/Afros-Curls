


module.exports = {
    goToLookbook: (req, res) => {
        if (req.isAuthenticated()) {
            res.render('signedIn/lookbook')
        } else {
            res.redirect('/login')
        }
    }
}