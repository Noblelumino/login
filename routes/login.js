const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user'); // Import the User model
const {checkNotAuthenticated}  = require('../passportConfig');
const  {initialize} = require('../passportConfig');





// Initialize Passport with the correct MongoDB query functions
initialize(
    passport,
    async (email) => {
        return await User.findOne({ email: email });
    },
    async (id) => {
        return await User.findById(id);
    }
);
// loading the login page 
router.get('/', checkNotAuthenticated, (req,res)=>{
    res.render('login')
})
//
router.post('/', passport.authenticate('local',{
    successRedirect: 'dashboard',
    failureRedirect: 'login',
    failureFlash: true

})
)




module.exports = router 