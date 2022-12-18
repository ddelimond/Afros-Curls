const mongoose = require("mongoose");

module.exports = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('/signedIn/about')
    } else {
        res.render('/signedOut/about')
    }

}