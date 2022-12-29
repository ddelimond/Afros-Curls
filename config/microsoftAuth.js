const MicrosoftStrategy = require('passport-microsoft').Strategy
const mongoose = require('mongoose')
let findOrCreate = require('mongoose-findorcreate')
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
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate({ userId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));
}