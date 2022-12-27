


module.exports = {
    goToLookbook: (req, res) => {
        if (req.isAuthenticated()) {
            res.render('signedIn/lookbook')
        } else {
            res.redirect('/login')
        }
    },
    goToLookbookMS: (req, res) => {
        if (req.isAuthenticated()) {
            res.render('signedInMS/lookbook')
        } else {
            res.redirect('/login')
        }
    }
}