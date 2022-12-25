const passport = require('passport')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const googleUser = require('../models/GoogleUser')



module.exports = passport => {
    passport.use(
        new GoogleStrategy({ clientID: process.env.ClientID, clientSecret: process.env.ClientSecret, callbackURL: "/auth/google/callback" },

            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                }



                try {
                    let user = await googleUser.findOne({ googleId: profile.id })

                    if (user) {
                        done(null, user)
                    } else {
                        user = await googleUser.create(newUser)
                        console.log(user)
                        done(null, user)
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        )
    )
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    googleUser.findById(id, (err, user) => done(err, user))
})




















// // const customFields = {
// //     usernameField: 'email',
// //     passwordField: 'password'
// // }

// // const verify = async (email, password, done) => {
// //     UserDb.findOne({ email: email })
// //         .then((user) => {

// //             if (!user) {
// //                 console.log(`User does not exist!`);
// //                 return done(null, false)
// //             }

// //             let compare = bcrypt.compare(password, user.password, (err, result) => {

// //                 if (result) {
// //                     console.log(`Login Successful`)
// //                     return done(null, user);
// //                 } else {
// //                     console.log('Wrong Password')
// //                     return done(null, false);
// //                 }
// //             });
// //         })
// //         .catch((err) => {
// //             done(err)
// //         })
// // }


// // const strategy = new LocalStrategy(customFields, verify)

// // passport.use(strategy)


// // passport.serializeUser((user, done) => {
// //     done(null, user.id)
// // })

// // passport.deserializeUser((userId, done) => {
// //     UserDb.findById(userId)
// //         .then((user) => {
// //             done(null, user)
// //         })
// //         .catch(err => done(err))

// // })

































































