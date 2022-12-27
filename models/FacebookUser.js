const mongoose = require('mongoose');

const facebookUser = mongoose.Schema({
    facebookID: {
        type: String,

    },
    displayName: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
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

module.exports = mongoose.model('facebookUser', facebookUser)