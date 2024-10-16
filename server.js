// this will load all our environment variables and set them inside of .env

if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const db = require('./config/db'); // Import the database connection





const PORT = process.env.PORT || 3000;



//set the view engine to ejs
app.set('view engine', 'ejs')
//set the file path
app.set('views',__dirname + '/views')

//since we are using forms 
app.use(express.urlencoded({extended: true}))
// allows message display 
app.use(flash())
// allows you to carry user info across the web
app.use(session({
    secret: process.env.SESSION_SECRET,
    // do you want to save the session set it to false 
    resave: false,
    // do you want to save an empty session ? we save to false
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// imports the routes to the server 
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const registerRouter  = require('./routes/register');
const dashboardRouter  = require('./routes/dashboard');



// use the routes based in the main server 
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/dashboard', dashboardRouter)





app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});