const mongoose = require('mongoose')

const FacebookUser = new mongoose.Schema({
    facebookId: {
        type: String,
        required: true,
    },

    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('facebookuser', FacebookUser)