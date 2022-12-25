const facebookUser = require('../models/FacebookUser')
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const passport = require('passport')


module.exports = (passport) => {
    passport.use(new FacebookStrategy({
        clientID: process.env.ClientID_FB,
        clientSecret: process.env.ClientSecret_FB,
        callbackURL: "/auth/facebook/callback"
    },
        async function (accessToken, refreshToken, profile, done) {

            console.log(profile)
            const newUser = {
                facebookID: profile.id
                // firstName: profile.name.displayName,
                // lastName: profile.name.familyNam

            }

            try {
                let user = await facebookUser.findOne({ facebookID: profile.id })

                if (user) {
                    done(null, user)
                } else {
                    user = await facebookUser.create(newUser)
                    console.log(user)
                    done(null, user)
                }
            } catch (err) {
                console.error(err)
            }
        }
    ));
}