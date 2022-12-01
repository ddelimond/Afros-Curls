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
const passport = require('passport')
const connect2Db = require('./config/connectdb')
const bodyParser = require('body-parser');
const flash = require('express-flash')




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


// body parser allows you to parse req.body for POST requests and return different elements of the body
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())



// routes
app.use('/', require('./routes/home'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))



app.listen(port, () => {
    console.log('Server running')
})















































// const path = require('path');
// // Expxress
// const express = require('express')
// // DOTENV
// const dotenv = require('dotenv');
// // loads config
// dotenv.config({ path: './config/config.env' });
// //Application 
// const app = express();
// // PORT
// const PORT = process.env.PORT || 8000;
// // Database
// const connect2Db = require('./config/connectdb');
// // morgan
// const morgan = require('morgan');
// // handlebars
// const exphbs = require('express-handlebars')
// // passport
// const passport = require('passport');
// // // passport config
// // require('./config/passport')(passport)
// // Express session
// const session = require('express-session')
// const MongoStore = require('connect-mongo');

// // connect to Database
// connect2Db()


// // Middlesware
// // middleware for handelbars, makes default layout 
// // main and allows you to omit hbs for file names

// app.engine('.hbs', exphbs.engine({
//     defaultLayout: false,
//     extname: '.hbs',
// }));
// app.set('view engine', '.hbs');


// // static files
// app.use(express.static('public'))



// // Run morgan if user is in the development eviorment 
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'))
// }

// // routes 
// app.use('/', require('./routes/home'))


// // Server is listening 
// app.listen(PORT, () => {
//     console.log('Server is on!')
// })
