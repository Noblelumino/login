const express = require('express')
const router = express.Router()
//const checkAuthenticated = require('../passportConfig')




router.get('/', (req,res) =>{
    res.render('index')
})



module.exports = router 
