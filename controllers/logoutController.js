const mongoose = require("mongoose");

module.exports = {
    logOut: (req, res, next) => {
        req.logout((logUserOut) => {
            if (logUserOut) { return next(logUserOut) }
            res.redirect('/login')
        })
    },
    logOutMS: (req, res) => {
        req.session.destroy(function (err) {
            req.logOut();
            res.redirect(config.destroySessionUrl);
        });
    }
}
