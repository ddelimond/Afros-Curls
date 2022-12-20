


module.exports = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('signedIn/stylists')
    } else {
        res.render('signedOut/stylists')
    }

}