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
const moment = require('moment')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const connect2Db = require('./config/connectdb')
const flash = require('connect-flash')
const mongoURI = process.env.Connect2Db
const User = require('./models/LocalUser');




// passport config
require('./config/localAuth')(passport)
// google auth config
require('./config/googleAuth')(passport)
// facebook auth config
require('./config/facbookAuth')(passport)
// microsoft auth config
require('./config/microsoftAuth')(passport)


// connect to Db!
connect2Db()


// middleware

// setting view to use ejs
app.set('view engine', 'ejs')


// tells server to look in the public folder for all static files that are placed in there.
app.use(express.static('public'))


//  body parser for post request except html post form
app.use(express.json())
// a body parser for html post request , only for forms
app.use(express.urlencoded({ extended: true }))

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
// authenticate the session
app.use(passport.authenticate('session'));


app.use(passport.initialize())
app.use(passport.session())



// flash alerts
app.use(flash());


// global variables for the different color alerts
// Global variables
app.use(function (req, res, next) {
    res.locals.successMsg = req.flash('successMsg');
    res.locals.errorMsg = req.flash('errorMsg');
    res.locals.error = req.flash('error');
    next();
});


// Auth Routing 

const isAuth = (req, res, next) => {

    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/login')
    }
}






// routes
app.use('/', require('./routes/home'))
app.use('/stylists', require('./routes/stylists'))
app.use('/appointments', require('./routes/appointments'))
app.use('/about', require('./routes/about'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))
app.use('/dashboard', require('./routes/dashboard'))
app.use('/logout', require('./routes/logout'))
app.use('/lookbook', require('./routes/lookbook'))
app.use('/auth', require('./routes/auth'))



app.listen(port, () => {
    console.log('Server running')
})