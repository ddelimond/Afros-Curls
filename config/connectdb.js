const mongoose = require('mongoose')


const connect2Db = function () {
    try {
        mongoose.connect(process.env.Connect2Db, () => {
            console.log('connected to Db!')
        })
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connect2Db