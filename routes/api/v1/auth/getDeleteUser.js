const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load User Model
const User = require("./../../../../models/User");
ObjectId = require('mongodb').ObjectID;

// @type    GET
//@route    /api/v1/myUser/allUsers
// @desc    route for getting all data from  user
// @access  PRIVATE

router.get(
  "/allUsers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
      console.log("allUsers")
    User.find({})
      .sort({ date: -1 })
      .then(User => res.json(User))
      .catch(err =>
        res
          .status(404)
          .json({ message: "No User Found", variant: "error" })
      );
  }
);
// @type    GET
//@route    /api/v1/myUser/allSupervisors
// @desc    route for getting all data from  user
// @access  PRIVATE

router.post(
  "/allSupervisors",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    if(req.user.designation.id == "admin" ||
     req.user.designation.id == "supervisor" ||
      req.user.designation.id == "fieldPartner")
      {
   let myMatch = {}
if(req.user.designation.id == "admin"){ 
 myMatch = {"designation.id": "supervisor"}
} else if(req.user.designation.id == "supervisor"){
  myMatch = {
    _id: ObjectId(req.user._id)
  }
} else if(req.user.designation.id == "fieldPartner"){
  myMatch = {
    _id: ObjectId(req.user.supervisor._id)
  }
}

    let allSupervisor = await User.aggregate([
         {$match: myMatch }, 
        {$project: { name:1 }  }
    
        ]).exec()
        res.json(allSupervisor)
      } else {
        res.json({
          "message":"You are not authorized to view this page",
          "variant":"error"
        })
      }
  }
);
// @type    GET
//@route    /api/v1/myUser/userWithSupervisor
// @desc    route for getting all data from  user
// @access  PRIVATE

router.post(
  "/userWithSupervisor",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   if(req.body.supervisorId){
     let myMatch = {
      "designation.id": "fieldPartner",
     "supervisor._id": req.body.supervisorId
   }
   if(req.user.designation.id == "fieldPartner"){
    myMatch = {
      _id: ObjectId(req.user._id)
    }}
    let allFieldPartner = await User.aggregate([
         {$match: myMatch }, 
        {$project: { name:1 }  }
    
        ]).exec()
        console.log(allFieldPartner)
        res.json(allFieldPartner)
      }else{
        res.json({
          "message":"Please provide supervisorId",
          "variant":"error"
        }) 
      }
  }
);

// @type    get
//@route    /api/v1/myUser/get/:id
// @desc    route to get single user by id
// @access  PRIVATE
router.get(
  "/get/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({
      _id: req.params.id
    }).then(User => res.json(User))
    .catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);

///////
// /api/v1/myUser/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {
console.log("delete")
    const id = req.params.id;
    User.findOne({ _id: id }).then(user => {
      if (user ) {
       
        if(user.id !== req.user.id){
           checkForChild(req,res,user)
      
        }else {
          res            
            .json({ message: "can't delete yourself", variant: "error" });
        }
  
      } else {
        res
          .json({ message: "user Not Found", variant: "error" });
      }
    });
 
  }
);

const deleteThisUser = (req,res,id) => {
  User.findOneAndDelete({ _id: id })
  .then(() =>
    res.json({ message: "Deleted successfully", variant: "success" })
  )
  .catch(err =>
    res.json("Failed to delete due to this error - " + err)
  );
}
const checkForChild = (req,res,user) => {
  let uId = user._id;
  User.findOne({ 'supervisor._id': uId }).then(
    user => {
      if(user){
        res.json({
          "message":"Can't Delete : Supervisor have child as Field Partner",
          "variant":"error"
        })
      } else {
        deleteThisUser(req,res,uId)
      }
    }
  ).catch(err => {console.log(err)})
}

// @type    GET
//@route    /api/v1/addition/user/alluser/:searchUser
// @desc    route for searching of user from searchbox using any text
// @access  PRIVATE
router.get(
  "/allUsers/:searchUser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const search = req.params.searchUser;
 
    if (isNaN(search)) {
      User.find({
        name: new RegExp(search, "i")
      }).then(User => res.json(User))
      .catch(err => res.json({message: "Problem in Searching" + err, variant: "success"}));
    } 

 

  }
);


module.exports = router;
