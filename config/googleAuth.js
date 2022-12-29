
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
                        return done(null, user)
                    } else {
                        user = await googleUser.create(newUser)
                        console.log(user)
                        return done(null, user)
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        )
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        googleUser.findById(id, (err, user) => done(err, user))
    })
}












