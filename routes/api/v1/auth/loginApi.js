const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../../../setup/myurl");
const jwt_decode = require("jwt-decode");
const User = require("../../../../models/User")
const axios = require("axios")


const sendLoginKey = (req,res,user) => {
  const payload = {
    id: user._id,
  
    designation: user.designation,
    userImage: user.userImage,

    name: user.name
  };
  jsonwt.sign(payload, key.secret,  (err, token) => {
    let obj = {
      success: true,
      token: "Bearer " + token,
      id: user._id,
      // isPaid:isPaid,
      message: "login success",
      variant: "success",
     
      userImage: user.userImage,
      designation: user.designation ,
      name: user.name
    }
    res.json(obj)
    const decoded = jwt_decode(token);     
  });
}
// Route to Login With Password
// /api/v1/auth/user/loginWithPassword
router.post('/user/loginWithPassword',(req,res) => {
  let password = req.body.password
  if(req.body.loginId && req.body.password){
    User.findOne({ 
      "$or": [{
        mobileNo:req.body.loginId
      }, {
        emailId:req.body.loginId
      }]
      })
    .then(user => {
      if (user) {
  // getting payment info 
  
          bcrypt
          .compare(password, user.password)
          .then(isCorrect => {
            if (isCorrect) {
              sendLoginKey(req,res,user) 
            } else {
              res.json({ message: "Incorrect Password ! Try Again ", variant: "error" });
            }
          })
          .catch(err => console.log(`error in password matching in login:${err}`));
  } else {
    res.json({ message: "Incorrect LoginId", variant: "error" });
  }
    })
    .catch(err => console.log(`error in login username match ${err}`));
  } else {
    res.json({
      message: "Mandatory Parameter missing",
      variant: "error"
    })
  }
 
})

module.exports = router;
