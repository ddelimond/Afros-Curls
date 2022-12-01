const passport = require('passport')
const initPassport = require('../auth');
const Users = require('../models/Users');
const LocalStrategy = require('passport-local').Strategy;



module.exports = {
    logIn: (req, res) => {
        res.render('login', { layout: 'noNavMenu' })
    },
    auth: (req, res) => {


    }
}