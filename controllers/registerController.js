const User = require('../models/Users')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const saltRounds = 9




module.exports = {
    register: (req, res) => {
        res.render('register', { layout: 'noNavMenu' })
    },
    registerUser: async (req, res) => {

        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const email = req.body.email
        let password = req.body.password

        // prevents users from having duplicate emails
        // const duplicateUser = await User.findOne({ email })
        // if (duplicateUser) { console.logll(` ${email} is already being used, please enter a new email`); res.sendStatus(409) }

        try {

            // salt and hash passwor

            password = await bcrypt.hash(password, saltRounds)

            const result = await User.create({
                firstname,
                lastname,
                email,
                password
            })
            console.log(result)
            console.log('User was created')
            res.redirect('/register')
        }
        catch (err) {
            console.log(err)
            res.redirect('/register')
        }
    }
}