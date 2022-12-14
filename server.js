if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express');
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config({ path: './config.env' })
const port = process.env.port || 8000
const morgan = require('morgan')
const moment = require('moment')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const connect2Db = require('./config/connectdb')
const flash = require('express-flash')

const mongoURI = process.env.Connect2Db




// connect to Db!
connect2Db()


// middleware

// setting up handelbars to use .hbs and have a default layout of main
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));
app.set('view engine', '.hbs')

// tells server to look in the public folder for all static files that are placed in there.
app.use(express.static('public'))


//  body parser for post request except html post form
app.use(express.json())
// a body parser for html post request , only for forms
app.use(express.urlencoded({ extended: true }))
app.use(flash())


// const sessionStore = MongoStore.create({
//     mongooseConnection: mongoose.connection,
//     document: 'mySessions'

// })

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoURI,
        collectionName: 'mySession'
    }),
    cookie: {
        maxAge: 10800000
    }
}))



const isAuth = (req, res, next) => {

    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/login')
    }
}


require('./config/passport')
// app.use(passport.initialize())
// app.use(passport.session())



// routes
app.use('/', require('./routes/home'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))
app.use('/dashboard', isAuth, require('./routes/dashboard'))



app.listen(port, () => {
    console.log('Server running')
})

