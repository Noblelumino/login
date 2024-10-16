const express = require('express')
const router = express.Router()

const { checkAuthenticated } = require("../passportConfig");





router.get("/dashboard", checkAuthenticated, function (req, res) {
    res.render("dashboard", {
    
      email: req.user.email,
    });
  });