
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const { use } = require('passport');



module.exports = function (passport) {
    passport.use(

        new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email has not be registered' })
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            return done(err, false)
                        }
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(err, false, { message: 'Incorrect Password' })
                        }
                    })
                })
                .catch(err => console.log(err))
        })

    )
}


passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
});



















// const customFields = {
//     usernameField: 'email',
//     passwordField: 'password'
// }

// const verify = async (email, password, done) => {
//     UserDb.findOne({ email: email })
//         .then((user) => {

//             if (!user) {
//                 console.log(`User does not exist!`);
//                 return done(null, false)
//             }

//             let compare = bcrypt.compare(password, user.password, (err, result) => {

//                 if (result) {
//                     console.log(`Login Successful`)
//                     return done(null, user);
//                 } else {
//                     console.log('Wrong Password')
//                     return done(null, false);
//                 }
//             });
//         })
//         .catch((err) => {
//             done(err)
//         })
// }


// const strategy = new LocalStrategy(customFields, verify)

// passport.use(strategy)


// passport.serializeUser((user, done) => {
//     done(null, user.id)
// })

// passport.deserializeUser((userId, done) => {
//     UserDb.findById(userId)
//         .then((user) => {
//             done(null, user)
//         })
//         .catch(err => done(err))

// })

































































