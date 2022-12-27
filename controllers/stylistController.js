


module.exports = {
    goToStylist: (req, res) => {
        if (req.isAuthenticated()) {
            res.render('signedIn/stylists')
        } else {
            res.render('signedOut/stylists')
        }

    },
    goToStylistMS: (req, res) => {
        if (req.isAuthenticated()) {
            res.render('signedInMS/stylists')
        } else {
            res.render('signedOut/stylists')
        }
    }
}