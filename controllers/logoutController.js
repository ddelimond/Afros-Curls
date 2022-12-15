const mongoose = require("mongoose");

module.exports = (req, res, next) => {
    req.logout((logUserOut) => {
        if (logUserOut) { return next(logUserOut) }
        res.redirect('/login')
    })
}
