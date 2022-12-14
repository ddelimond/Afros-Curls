const passport = require("passport-local")

module.exports = {
    goToDashboard: (req, res) => {
        res.render('signedIn/dashboard')
    }
}