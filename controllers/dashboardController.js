module.exports = {
    goToDashboard: (req, res) => {
        res.render('signedIn/dashboard')
    },
    goToDashboardMS: (req, res) => {
        res.render('signedInMS/dashboard')
    }
}