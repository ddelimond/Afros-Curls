
const MicrosoftStrategy = require('passport-microsoft').Strategy
const mongoose = require('mongoose')
const User = require('../models/MicrosoftUser')

module.exports = function (passport) {
    passport.use(new MicrosoftStrategy({
        // Standard OAuth2 options
        clientID: process.env.ClienID_MS,
        clientSecret: process.env.ClientSecret_MS,
        callbackURL: "https://afros-and-curls.onrender.com/auth/microsoft/callback",
        scope: ['user.read'],

        // Microsoft specific options

        // [Optional] The tenant for the application. Defaults to 'common'. 
        // Used to construct the authorizationURL and tokenURL
        tenant: 'common',

        // [Optional] The authorization URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`
        authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',

        // [Optional] The token URL. Defaults to `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`
        tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile)
                let user = User.findOne({ microsoftId: profile.id })

                if (user) {
                    return done(null, user)
                } else {
                    user = await User.create({ microsoftId: profile.id, displayName: profile.displayName })
                    return done(null, user)
                }

            } catch (err) {
                console.error(err)
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}