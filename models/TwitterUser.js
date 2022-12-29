const mongoose = require('mongoose');

const twitterUser = mongoose.Schema({
    twitterId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
    },
    username: {
        type: String,
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('twitterUser', twitterUser)