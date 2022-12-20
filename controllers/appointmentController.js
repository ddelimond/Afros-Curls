module.exports = {
    goToAppointments: (req, res) => {
        if (req.isAuthenticated()) { res.render('signedIn/appointments') }
        else { res.render('login') }
    }
}