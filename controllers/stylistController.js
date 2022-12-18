


module.exports = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('/signedIn/stylist')
    } else {
        res.render('/signedOut/stylist')
    }

}