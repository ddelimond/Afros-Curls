const MicrosoftStrategy = require('passport-microsoft').Strategy
const mongoose = require('mongoose')
const User = require('../models/MicrosoftUser')

module.exports = (passport) => {
    passport.use(new MicrosoftStrategy({
        // Standard OAuth2 options
        clientID: process.env.ClientID_MS,
        clientSecret: process.env.ClientSecret_MS_Value,
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
        async function (accessToken, refreshToken, profile, done) {
            try {
                let user = await User.findOne({ userId: profile.id })
                if (!user) {
                    user = await User.create({
                        microsoftId: profile.id,
                        displayName: profile.displayName,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value
                    })
                    return done(null, user);
                } else {
                    console.log(user)
                    return done(null, user)
                }
            } catch (err) {
                console.log(err)
                done(err, false)
            }

        }

    ));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (user, done) {
        User.findById(id, (err, user) => done(err, user))
    });
}