const express = require('express')
const router = express.Router()
const checkAuthenticated = require('../passportConfig')




router.get('/',checkAuthenticated, (req,res) =>{
    res.render('index')
})



module.exports = router 
