const User = require('../models/Users')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const flash = require('connect-flash')
const saltRounds = 10




module.exports = {
    register: (req, res) => {
        res.render('register')
    },
    registerUser: async (req, res) => {

        let errors = []

        let { firstname, lastname, email, password } = req.body

        try {

            // salt and hash passwor

            // prevents users from having duplicate emails
            const duplicateUser = await User.findOne({ email })
            if (duplicateUser) {
                errors.push({ msg: `Email is already registered` })
            }
            if (password.length < 8) {
                errors.push({ msg: `Password must be at least 8 characters` })
            }

            if (errors.length > 0) {
                res.render('register', {
                    errors,
                    firstname,
                    lastname,
                    email,
                    password

                })
            } else {
                password = await bcrypt.hash(password, saltRounds)

                let newUser = User.create({
                    firstname,
                    lastname,
                    email,
                    password
                })


                req.flash('successMgs', `User Created`)
                res.redirect('/login')
            }

        } catch (err) {
            console.log(err)
        }
    }
}