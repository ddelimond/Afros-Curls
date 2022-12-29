const twitterUser = require('../models/TwitterUser')
const TwitterStrategy = require('passport-twitter').Strategy
const mongoose = require('mongoose')
const passport = require('passport')


module.exports = (passport) => {
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TwitterAPIKey,
        consumerSecret: process.env.TwitterAPISecret,
        callbackURL: "https://afros-and-curls.onrender.com/auth/twitter/callback"
    },
        async (token, tokenSecret, profile, done) => {
            try {
                console.log(profile)
                let user = twitterUser.findOne({ twitterId: profile.id }, (err, user) => {
                    return done(err, user)
                });
            } catch (err) {
                console.log(err)
            }

        }
    ));
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        twitterUser.findById(id, (err, user) => done(err, user))
    })

}