const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        // required: true
    },
    lastname: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    refreshToken: {
        type: String
    }

})

module.exports = mongoose.model('User', userSchema)