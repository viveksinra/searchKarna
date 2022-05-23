const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../../../setup/myurl");
const jwt_decode = require("jwt-decode");
const User = require("../../../../models/User")
const axios = require("axios")

// Route to Register/Add User 
// /api/v1/v1/auth/register/user
router.post('/register/user/', 
passport.authenticate("jwt", { session: false }),
(req,res) => {
  
  if(req.user.designation.id == "admin")
  {
    var str = req.body.name;
    //Now I separate them by "|"
    var str1 = str.split(" ");
    var str2 = str1[0]
    var str4
      var str3 = makeid(Math.floor(Math.random()*10))
    
     str4 = str2+"."+str3
    
      newUser = new User({
        name: req.body.name,
        mobileNo: req.body.mobileNo,
        emailId: req.body.emailId,
        password: req.body.password,
        state: req.body.state,
        district: req.body.district,
        designation: req.body.designation,
        supervisor: req.body.supervisor,
       
        value:req.body.password,
        userName:str4,
    
       
      });
    
      User.findOne({mobileNo:req.body.mobileNo}).then(
        user => {
          if(user){
            res.json({
              "message":"Mobile Number Already Exist",
              "variant":"error"
            })
          }else {
            User.findOne({emailId:req.body.emailId}).then(
              user => {
                if(user){
                  res.json({
                    "message":"Email ID Already Exist",
                    "variant":"error"
                  })
                }else {
                   User.findOne({userName:str4}).then(
                    user => {
                      if(user){
                        res.json({
                          "message":"Sorry: Something Went Wrong",
                          "variant":"error"
                        })
                      }else {
                        registerNewUser(req,res,newUser)
                      }
                    }
                  ).catch(Err => console.log(Err))
                }
              }
            ).catch(Err => console.log(Err))
          }
        }
      ).catch(Err => console.log(Err))
        
  } else {
    res.json({
      "message":"You are not Authorised for this operation",
      "variant":"error"
    })
  }

  
})

const registerNewUser = (req,res,newUser) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then((user) =>
          res.json({
            message: "Congratulation ! Your Account is Successfully Created ",
            variant: "success"
          })
          
        )
        .catch(err =>
          res.json(
            {
              message: "Problem in saving",
              variant: "error"
            } + err
          )
        );
    });
  });
}

function makeid(k)
{ 

let l = 3
var text = "";
var char_list = "abcdefghijklmnopqrstuvwxyz0123456789";
for(var i=0; i < l; i++ )
{  
text += char_list.charAt(Math.floor(Math.random() * char_list.length));
}
return text;
}


// route to update User
//
// /api/v1/auth/register/user/
router.post(
  "/register/user/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) =>{
    if(req.user.designation.id == "admin")
    {
      User.findOne({mobileNo:req.body.mobileNo}).then(
        user => {
          if(user && user._id != req.params.id){
            res.json({
              "message":"Mobile Number Already Exist",
              "variant":"error"
            })
          }else {
            User.findOne({emailId:req.body.emailId}).then(
              user => {
                if(user && user._id != req.params.id){
                  res.json({
                    "message":"Email ID Already Exist",
                    "variant":"error"
                  })
                }else {
                  updateUser(req,res)
                }
              }
            ).catch(Err => console.log(Err))
          }
        }
      ).catch(Err => console.log(Err))
     
    } else {
      res.json({
        "message":"You are not Authorised for this operation",
        "variant":"error"
      })
    }
     
  }
);


//////////////
const updateUser = async(req, res) => {

      
  var des = req.user.designation.id;
  var des1 = "admin";
  var des2 = "manager";
// here we are checking designation in last step, that is in funtion called
 if (des == des1 || des == des2  ) {


  const userValues = { 
    supervisor:{}
  };

  if(req.body.name)userValues.name = req.body.name;
  if(req.body.mobileNo)userValues.mobileNo = req.body.mobileNo;
  if(req.body.emailId)userValues.emailId = req.body.emailId;
  // state district designation supervisor
  if(req.body.state)userValues.state = req.body.state;
  if(req.body.district)userValues.district = req.body.district;
  if(req.body.designation)userValues.designation = req.body.designation;
  if(req.body.supervisor)userValues.supervisor = req.body.supervisor;
  if(req.body.password)userValues.value = req.body.password;
  if(req.body.password)userValues.password = req.body.password;
  if(req.body.password) {
      bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(userValues.password, salt, (err, hash) => {
            if (err) throw err;
            userValues.password = hash;
  updateMe(req,res,userValues)
         
            
          });
        });
  } else {
      updateMe(req,res,userValues)

  }

 


 

  } else {
    res.json({ message: "You are not Authorised", variant: "error" })
  }
}

async function updateMe(req,res,userValues){

  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: userValues },
    { new: true }
  )
    .then(user => {
      if (user){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )

    .catch(err =>
      console.log("Problem in updating user value" + err)
    );



}

const checkForDuplicate = () => {

}
module.exports = router;
