const mongoose = require('mongoose')

const MicrosoftUser = new mongoose.Schema({
    microsoftId: {
        type: String,
        required: true,
    },

    displayName: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('microsoftUser', MicrosoftUser)