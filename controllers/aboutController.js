const mongoose = require("mongoose");

module.exports = {

    goToAbout: (req, res) => {
        if (req.isAuthenticated()) {
            res.render('signedIn/about')
        } else {
            res.render('signedOut/about')
        }

    },
    goToAboutMS: (req, res) => {
        if (req.isAuthenticated()) {
            res.render('/signedInMS/about')
        } else {
            res.render('signedOut/about')
        }
    }
}