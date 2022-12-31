const passport = require('passport')
const User = require('../models/FacebookUser')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = (passport) => {

    passport.use(new FacebookStrategy({
        clientID: process.env.FacebookAppID,
        clientSecret: process.env.FacebookAppSecret,
        callbackURL: "https://afros-and-curls.onrender.com/auth/facebook/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = User.findOne({ facebookId: profile.id })
                if (!user) {
                    user = await User.create({ facebookId: profile.id, firstname: profile.givenName, lastName: profile.familyName })
                    return done(null, user)
                } else {
                    done(null, user)
                }

            } catch (err) {
                console.log(err)
                done(null, err)
            }
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}