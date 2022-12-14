const passport = require('passport')
const Users = require('../models/Users');
// const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
// const flash = require('express-flash')
const session = require('express-session')



module.exports = {
    goToLogInForm: (req, res) => {
        res.render('login', { layout: 'noNavMenu' })
    },
    login: (req, res) => {

        Users.findOne({ email: req.body.email }, (err, result) => {

            if (result === null) { console.log('User does not exist') }
            else {
                bcrypt.compare(req.body.password, result.password, async (err, result) => {

                    if (result) {

                        req.session.isAuth = true
                        console.log('Successful Login')
                        res.redirect('/dashboard')
                    } else {
                        console.log('Wrong Password')
                        res.redirect('/login')
                    }
                })
            }
        })

    }
}