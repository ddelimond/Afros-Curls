const User = require('../models/TwitterUser')
const TwitterStrategy = require('passport-twitter').Strategy
const mongoose = require('mongoose')
const passport = require('passport')


module.exports = (passport) => {
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TwitterAPIKey,
        consumerSecret: process.env.TwitterAPISecret,
        callbackURL: "http://localhost:8000/auth/twitter/callback"
    },
        async (token, tokenSecret, profile, done) => {
            try {
                console.log(profile)
                let user = await User.findOne({ twitterId: profile.id }, (err, user) => {
                    return done(err, user)
                });

                if (use) {
                    return done(null, user)
                } else {
                    user = await User.create({
                        twitterId: profile.id,
                        displayName: profile.displayName,
                        userName: profile.username,
                        image: profile.photos[0].value,
                    })
                    return done(null, user)
                }
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