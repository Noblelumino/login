const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const User = require('../models/user'); // Import the User model
const checkNotAuthenticated  = require('./passportConfig');
const  initialize = require('./passportConfig');


// Initialize Passport
initialize(passport);





router.get('/',checkNotAuthenticated, (req,res)=>{
    res.render('register')
})


// submitting the forms (registration)
router.post('/', async (req,res)=>{
    try {
        const hashedPassword = await argon2.hash(req.body.password)
        const user = new User({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        await user.save();
        console.log(user) //for eror checking
        res.redirect('login')
    } catch (error) {
        console.log('error')

        res.redirect('register')
    }
})

module.exports = router;

