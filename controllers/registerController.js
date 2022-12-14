const User = require('../models/Users')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const flash = require('express-flash')
const saltRounds = 10




module.exports = {
    register: (req, res) => {
        res.render('register', { layout: 'noNavMenu' })
    },
    registerUser: async (req, res, next) => {

        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const email = req.body.email
        let password = req.body.password

        try {

            // salt and hash passwor

            // prevents users from having duplicate emails
            const duplicateUser = await User.findOne({ email })
            if (duplicateUser) {
                throw console.error(` ${email} is already being used`, 409)
            } else {
                password = await bcrypt.hash(password, saltRounds)

                const newUser = await User.create({
                    firstname,
                    lastname,
                    email,
                    password
                })
                req.flash('info', 'User was created')
                res.redirect('/register')
            }

        }
        catch (err) {
            console.log(err)
            res.redirect('/register')
        }
    }
}