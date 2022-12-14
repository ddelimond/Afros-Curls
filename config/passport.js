
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const UserDb = require('../models/Users');

const strategy = new LocalStrategy;

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
}

const verify = (email, password, done) => {

}

passport.use(
    new LocalStrategy(function verify(email, password, done) {

        UserDb.findOne({ email: email }, async (err, result) => {
            if (result === null) {
                console.log('User does not exist')
            } else {
                if (result) {
                    await bcrypt.compare(password, result.password, (err, result) => {
                        if (result) {

                            console.log('Login Successful')
                        } else {
                            console.log('Wrong Password')
                        }
                    })
                }
            }
        })

    })
)



































































// const mongoose = require('mongoose')
// const passport = require('passport')
// const localStrategy = require('passport-local').Strategy
// const User = mongoose.models.Users

// // field in the form that passport will look for and  user when the form is submitted 

// const customFeilds = {
//     usernameField: 'username',
//     passwordField: 'password'
// }

// // the verify callback that will be used in the  strategy 
// const verifyCb = (username, password, done) => {

//     // go to user Db and find a user with the specified username 
//     User.findOne({ username: username })
//         .then((user) => {

//             // if there is not a user with the specified username then reject the user
//             if (!user) { return done(null, false) }

//             // function that defines a valid password
//             const isValid = validPassword(password, user.hash, user.salt);

//             if (isValid) { return done(null, user) }
//             else { return done(null, false) }
//         })
//         .catch((err) => {
//             done(err)
//         })

// }

// // define the strategy that you want to use
// const strategy = new localStrategy(customFeilds, verifyCb)

// passport.use(strategy)



// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });


// passport.deserializeUser(function (user, cb) {
//     process.nextTick(function () {
//         return cb(null, user);
//     });
// });