const mongoose = require('mongoose')

const FacebookUser = new mongoose.Schema({
    facebookId: {
        type: String,
        required: true,
    },

    displayName: {
        type: String,

    },
    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('facebookuser', FacebookUser)