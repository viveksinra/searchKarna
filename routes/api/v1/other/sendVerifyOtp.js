const express = require("express");
const router = express.Router();
const passport = require("passport");

// @type    post
//@route    /api/v1/other/sendVerifyOtp/sendOtp
// @desc    route to get otp
// @access  PRIVATE
router.post(
  "/sendOtp",
//   passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   
    const  contactNo1 = req.body.contactNo1;
    if(contactNo1.length != 10){
      res.json({
          message:"Contact number should be 10 digit",
        variant: "error"
      })
    } else {
        res.json({
            message:"Contact number is valid - Otp Sent",
            variant: "success"
        })
    }
    

  }
);

// @type    get
//@route    /api/v1/other/sendVerifyOtp/verifyOtp
// @desc    route to get single category by id
// @access  PRIVATE
router.post(
  "/verifyOtp",
//   passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   
    const  contactNo1 = req.body.contactNo1;
    const otp = req.body.otp;
    if(otp == "1234"){
      res.json({
          message:"Otp is valid",
          variant: "success"
      })
    } else {
        res.json({
            message:"Otp is invalid",
            variant: "error"
        })
    }


  }
);





module.exports = router;
