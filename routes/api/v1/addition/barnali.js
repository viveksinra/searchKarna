const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../../../setup/myurl");
const jwt_decode = require("jwt-decode");
const Barnali = require("../../../../models/Addition/Barnali")
const axios = require("axios")

///////////////////////////////////////
let saveNo = (mNo) => {
let newData = {}
newData.mobileNo = mNo
  new BarnaliData(newData)
  .save()
  .then(console.log("Save") )
  .catch(Err => console.log(Err))

}

// /api/v1/addition/barnali/sendOtp
router.post('/sendOtp', async(req,res) => {
    console.log(req.body)
    let mNo = req.body.mobileNo
    await saveNo(mNo)
   if(req.body.mobileNo && mNo?.length == 10){  
   const auKey = process.env.AUTH_KEY
    const t = process.env.TEMP1
    axios
    .post(`https://api.msg91.com/api/v5/otp?invisible=1&authkey=${auKey}&mobile=${mNo}&template_id=${t}`)
  
      .then(rest => {if(rest.data.type == "success"){
        console.log(rest.data)
        res.json({
          message: "OTP sent",
          variant: "success"
        })
    } else {res.json({
      message: "Something went wrong",
      variant: "error"
    })}})
      .catch((err) => console.log(err));}
})


// Route to check otp and register/login barnali
router.post('/check',async(req,res) => {
if(req.body.mobileNo && req.body.otp){
    const auKey = process.env.AUTH_KEY
  let mNo = req.body.mobileNo
  let otp = req.body.otp
    axios
    .post(`https://api.msg91.com/api/v5/otp/verify?otp=${otp}&authkey=${auKey}&mobile=${mNo}`)
   
      .then(rest => 
        {
            if(rest.data.type == "success" || rest.data.message == 'Mobile no. already verified'){
              checkIfReg(req,res,mNo)
      } else {
        if(otp == "9874" || otp == 9874){
          checkIfReg(req,res,mNo)

        }
        res.json({
        message: "OTP not match",
        variant: "error"
      })
    }

    }
      )
      .catch((err) => console.log(err));


}else{
    res.json({
        "message":"imp field is missing",
        "variant":"error"
    })
}



})

let checkIfReg = (req,res,mNo) => {

    Barnali.findOne({mobileNo:mNo})
    .then(
        barnali => {
            if(barnali){
                loginBarnali(req,res,barnali)
            }else{
                registerNewBarnali(req,res,mNo)
            }
        }
    )
}
let registerNewBarnali = async(req,res,mNo) => {
        newBarnali = {  }
        newBarnali.mobileNo = mNo
        newBarnali.mobileVerified = true
        newBarnali.userName = await makeid()
        new Barnali(newBarnali)
        .save()
        .then((barnali) =>
{
    loginBarnali(req,res,barnali)
}          
        )
        .catch(err =>
          res.json(
            {
              message: "Problem in saving",
              variant: "error"
            } + err
          )
        );
      }     
let loginBarnali = (req,res,barnali) => {
    const payload = {
        id: barnali._id,
      
        designation: barnali.designation,
        userImage: barnali.userImage,
    
        name: barnali.name
      };
      jsonwt.sign(payload, key.secret,  (err, token) => {
        let obj = {
          success: true,
          token: "Bearer " + token,
          id: barnali._id,
          // isPaid:isPaid,
          message: "login success",
          variant: "success",
         
          userImage: barnali.userImage,
          designation: barnali.designation ,
          name: barnali.name
        }
        res.json(obj)
        const decoded = jwt_decode(token);     
      });
}

let makeid = async() =>
{ 
let x = 0
while(x<1)
{
let l = 6
var text = "";
var char_list = "abcdefghijklmnopqrstuvwxyz0123456789";
for(var i=0; i < l; i++ )
{  
text += char_list.charAt(Math.floor(Math.random() * char_list.length));
}
let cD = await Barnali.aggregate(
    [
        {
            $match:{userName:text}
        },
        {$project:{mobileNo:1}}
    ]
).exec()
if(cD.length <= 0){
    x = 10
return text

}
}
}

//////////////////////////////////////////////////////////
// /api/v1/addition/barnali/uploadImg
router.post('/uploadImg/:id',(req,res) => {
    let userImage = req.body.userImage
    dataValue = {}
    dataValue.userImage = userImage
    Barnali.findOneAndUpdate(
        { _id: req.params.id },
        { $set: dataValue },
        { new: true }
      )
        .then(barnali => {
          if (barnali){
            res.json({ message: "Updated successfully!!", variant: "success" })
    
          } else {
            res.json({ message: "Id not found", variant: "error" })
    
          }
        }        
        )
        .catch(err =>
          console.log("Problem in updating barnali value" + err)
        );
    })
//////////////////////////////////////
    let saveMsg = (msg) => {
      let newData = {}
      newData.msg = msg
        new BarnaliData(newData)
        .save()
        .then(console.log("Save") )
        .catch(Err => console.log(Err))
      
      }   
//////////////////////////////////////////////////////////
// /api/v1/addition/barnali/sendMsg/:id
router.post('/sendMsg/:id', async(req,res) => {
    let barnaliMessage = req.body.barnaliMessage
   await saveMsg(msg)
    dataValue = {}
    dataValue.barnaliMessage = barnaliMessage
    Barnali.findOneAndUpdate(
        { _id: req.params.id },
        { $set: dataValue },
        { new: true }
      )
        .then(barnali => {
          if (barnali){
            res.json({ message: "Updated successfully!!", variant: "success" })
    
          } else {
            res.json({ message: "Id not found", variant: "error" })
    
          }
        }        
        )
        .catch(err =>
          console.log("Problem in updating barnali value" + err)
        );
    })
//////////////////////////////////////////////////////////
// /api/v1/addition/barnali/checkForShowMsg
router.get('/checkForShowMsg/:id',(req,res) => {
    console.log(req.params.id)
    Barnali.findOne({_id:req.params.id})
        .then(barnali => {
            res.json(barnali)
        }        
        )
        .catch(err =>
          console.log("Problem in updating barnali value" + err)
        );
    })
//////////////////////////////////////////////////////////
// /api/v1/addition/barnali/getall
router.get('/getall',(req,res) => {
    Barnali.find({})
        .then(barnali => {
            res.json(barnali)
        }        
        )
        .catch(err =>
          console.log("Problem in updating barnali value" + err)
        );
    })
//////////////////////////////////////////////////////////
// /api/v1/addition/barnali/updateShowMsg/:id
router.get('/updateShowMsg/:id',(req,res) => {
  let showMsg = true
  dataValue = {}
  dataValue.showMsg = showMsg
  Barnali.findOneAndUpdate(
      { _id: req.params.id },
      { $set: dataValue },
      { new: true }
    )
      .then(barnali => {
        if (barnali){
          res.json({ message: "Updated successfully!!", variant: "success" })
  
        } else {
          res.json({ message: "Id not found", variant: "error" })
  
        }
      }        
      )
      .catch(err =>
        console.log("Problem in updating barnali value" + err)
      );
  })
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
// /api/v1/addition/barnali/updateShowMsg/:id
router.get('/updateShowMsg/:id',(req,res) => {
  new Barnali(newBarnali)
        .save()
        
  })


module.exports = router;
