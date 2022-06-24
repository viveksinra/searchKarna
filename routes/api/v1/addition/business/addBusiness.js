const express = require("express");
const router = express.Router();
const passport = require("passport");

const img = require("../../../../../setup/myimageurl")

//Load User Model
const User = require("../../../../../models/User");

//Load Business.js Model
const Business = require("../../../../../models/Addition/Business");

// @type    POST
//@route    /api/v1/addition/business/addBusiness/
// @desc    route for SAVING data for service
// @access  PRIVATE
router.post(
  "/",
   passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if(req.user.designation.id == "fieldPartner"){
   
    const serviceValues = {
   
      category:{},
      subCategory:{},
    };
    serviceValues.user = req.user.id;
    serviceValues.createdByUser = req.user.id;
    serviceValues.creationDate = new Date();
    
//link start

    var strs = req.body.link;
    var rests = strs.replace(/  | |   |    |      /gi, function (x) {
      return  "";
    });
    serviceValues.link = rests;
//link end
    serviceValues.state = req.body.state;
    serviceValues.district = req.body.district;
    serviceValues.cityBlock = req.body.cityBlock;
    serviceValues.areaName = req.body.areaName;
    serviceValues.pincode = req.body.pincode;
    serviceValues.landmark = req.body.landmark;
    
    serviceValues.receiptNo = req.body.receiptNo;
    serviceValues.contactPersonName = req.body.contactPersonName;
    serviceValues.whatsAppNo = req.body.contactNo1;
    serviceValues.contactNo1 = req.body.contactNo1;
    serviceValues.contactNo2 = req.body.contactNo2;
    serviceValues.contactNo3 = req.body.contactNo3;
    serviceValues.contactNo4 = req.body.contactNo4;
    serviceValues.businessName = req.body.businessName;
    serviceValues.emailId = req.body.emailId;
    serviceValues.website = req.body.website;
    serviceValues.latitude = req.body.latitude;
    serviceValues.longitude = req.body.longitude;
    serviceValues.yearEstablished = req.body.yearEstablished;
    serviceValues.modesOfPayment = req.body.modesOfPayment;
    serviceValues.allImage = req.body.allImage;

    serviceValues.isOtpVerified = req.body.isOtpVerified;
    serviceValues.openingTime = req.body.openingTime;
    serviceValues.closingTime = req.body.closingTime;
    serviceValues.closedDays = req.body.closedDays;

    serviceValues.category.categoryName = req.body.category.categoryName;
    serviceValues.category.link = req.body.category.link;
    serviceValues.subCategory.subCategoryName = req.body.subCategory.subCategoryName;
    serviceValues.subCategory.link = req.body.subCategory.link;
    serviceValues.myServices = req.body.myServices;


if (req.body.description == ""){
  serviceValues.description = "";

} else {
  serviceValues.description = req.body.description;
  
}
    //getting last voucher number and making new one 

    //Do database stuff
if(
  serviceValues.businessName == undefined || serviceValues.businessName == "" ||
  serviceValues.link == undefined || serviceValues.link == ""
){

  res.json({
    message: "businessName, link are Required field",
    variant: "error"
})

  
    }

    else if(
      serviceValues.state == undefined || serviceValues.state == "" ||
      serviceValues.district == undefined || serviceValues.district == "" ||
      serviceValues.cityBlock == undefined || serviceValues.cityBlock == "" ||
      serviceValues.areaName == undefined || serviceValues.areaName == "" 
    ){
      res.json({
        message: "Locations are Required field",
        variant: "error"
      })
    } else if (serviceValues.receiptNo == undefined || serviceValues.receiptNo == ""){
      res.json({
        message: "Receipt No is Required field",
        variant: "error"
      })   
      
    }
    else {
      let today = new Date();
      let month = today.getMonth()+1
      if(month<10){
        month = 0+''+month
      }
      
      var date = today.getDate()+''+(month)+''+ today.getFullYear();
      
      let receiptNo = serviceValues.receiptNo
      
      let FiveD = Math.floor(10000 + Math.random() * 90000)
      
      serviceValues.registrationNo = `${date}${receiptNo}${FiveD}`;
console.log("serviceValues")
console.log(serviceValues)
          Business.findOne({
            emailId: serviceValues.emailId
          })
            .then(service => {
              //Username already exists
              if (service) {
                res.json({
                  message: "emailId Already exist ",
                  variant: "error"
                });
              } else {
                Business.findOne({
                    contactNo1: serviceValues.contactNo1
                })
                  .then(service => {
                    //Username already exists
                    if (service) {
                      res.json({
                        message: "contactNo1 Already exist ",
                        variant: "error"
                      });
                    } else {

                       Business.findOne({
                  link: serviceValues.link
                })
                  .then(service => {
                    //Username already exists
                    if (service) {
                      res.json({
                        message: "link Already exist ",
                        variant: "error"
                      });
                    } else {
                        
                      new Business(serviceValues)
                      .save()
                      .then(
                        res.json({
                          message: "Successfully saved",
                          variant: "success"
                        })
                      )
                      .catch(err => console.log(err));
                      
                    }})
                    .catch(err => console.log(err));
                    }})
                    .catch(err => console.log(err));
              }
            })
            .catch(err => console.log(err));   

    }
    } else {
      res.json({
        "message":"Only Field Partners is allowed to Add business",
        "variant":"error"
      })
    }
  }
);

// @type    GET
//@route    /api/v1/addition/business/addBusiness/allservice
// @desc    route for getting all data from  service
// @access  PRIVATE

router.get(
  "/allservice",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Business.find({})
      .sort({ date: -1 })
      .then(Business => res.json(Business))
      .catch(err =>
        res
          .status(404)
          .json({ message: "No Business Found", variant: "error" })
      );
  }
);
// @type    GET
//@route    /api/v1/addition/business/addBusiness/tableData
// @desc    route for getting all data from  service
// @access  PRIVATE

router.post(
  "/tableData",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    let myMatch = {}

    resData(res, myMatch)

  }
);

const resData = async(res, myMatch) => { 

  let businessData = await Business.aggregate([
    //  {$match: {"designation.id": "supervisor"} }, 
    {$project: { category:1,
       businessName:1,
       modesOfPayment:1,
       state:1,cityBlock:1 }  
      }    
    ]).exec()
    for(let i=0;i<businessData.length;i++){
      businessData[i].categoryName = businessData[i].category.categoryName
    }
    res.json(businessData)
}
// @type    GET
//@route    /api/v1/addition/business/addBusiness/oneData
// @desc    route for getting all data from  service
// @access  PRIVATE

router.get(
  "/oneData/:id",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.params.id);
    let businessData = await Business.findOne({
      _id: id
    })
    .catch(err => res.json({
      message: "Problem in finding With this Id",
       variant: "error"}));
// console.log(businessData)
let myData = []


myData.push({"myKey":"categoryName", "myValue": businessData.category.categoryName})
myData.push({"myKey":"subCategoryName", "myValue": businessData.subCategory.subCategoryName})
let allServiceName = "";
for(i=0;i<businessData.myServices.length;i++){
    allServiceName += businessData.myServices[i].serviceName+","
    if(i==businessData.myServices.length-1){
      myData.push({"myKey":"serviceName", "myValue": allServiceName})

    }
}
myData.push({"myKey":"State", "myValue": businessData.state})
myData.push({"myKey":"district", "myValue": businessData.district})
myData.push({"myKey":"cityBlock", "myValue": businessData.cityBlock})
myData.push({"myKey":"areaName", "myValue": businessData.areaName})
myData.push({"myKey":"pincode", "myValue": businessData.pincode})
myData.push({"myKey":"landmark", "myValue": businessData.landmark})
myData.push({"myKey":"registrationNo", "myValue": businessData.registrationNo})
myData.push({"myKey":"receiptNo", "myValue": businessData.receiptNo})
myData.push({"myKey":"contactPersonName", "myValue": businessData.contactPersonName})
myData.push({"myKey":"Primary Contact No", "myValue": businessData.contactNo1})
myData.push({"myKey":"Secondary Contact No", "myValue": businessData.contactNo2})
myData.push({"myKey":"Other contactNo1", "myValue": businessData.contactNo3})
myData.push({"myKey":"Other contactNo2", "myValue": businessData.contactNo4})
myData.push({"myKey":"businessName", "myValue": businessData.businessName})
myData.push({"myKey":"link", "myValue": businessData.link})
myData.push({"myKey":"emailId", "myValue": businessData.emailId})
myData.push({"myKey":"website", "myValue": businessData.website})

myData.push({"myKey":"Opening Time", "myValue": businessData.openingTime})
myData.push({"myKey":"Closing Time", "myValue": businessData.closingTime})
myData.push({"myKey":"Closed Days", "myValue": businessData.closedDays})
myData.push({"myKey":"Otp Verified", "myValue": businessData.isOtpVerified})

myData.push({"myKey":"yearEstablished", "myValue": businessData.yearEstablished})
myData.push({"myKey":"latitude", "myValue": businessData.latitude})
myData.push({"myKey":"longitude", "myValue": businessData.longitude})
myData.push({"myKey":"modesOfPayment", "myValue": businessData.modesOfPayment})

let locationLink = "#"
if(businessData.longitude != undefined && businessData.longitude != ""){
 locationLink = `https://maps.google.com/?q=${businessData.latitude},${businessData.longitude}`

}


        res.json({myData,visibility: businessData.visibility, locationLink,allImage: businessData.allImage})
  }
);

// @type    get
//@route    /api/v1/addition/business/addBusiness/get/:id
// @desc    route to get single service by id
// @access  PRIVATE
router.get(
  "/get/:id",

  (req, res) => {
    Business.findOne({
      _id: req.params.id
    }).then(Business => res.json(Business)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);
// @type    POST
//@route    /api/v1/addition/business/addBusiness/updateVisibility/:id
// @desc    route to update Business Visibility
// @access  PRIVATE
router.post(
  "/updateVisibility/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if(req.user.designation.id == "supervisor" || req.user.designation.id == "admin"){
    let businessValue = {
      visibility: req.body.visibility
    }
    Business.findOne({
      _id: req.params.id
    }).then(
      data => {
        if(data){
          Business.findOneAndUpdate(
            { _id: req.params.id },
            { $set: businessValue },
            { new: true }
          ).then(
            data => {
              res.json({message: "Visibility Updated", variant: "success"});
            }
          )
          .catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
        } else {
          res.json({message: "Problem in finding With this Id", variant: "error"});
        }
      }
    ).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  } else {
    res.json({
      "message":"You are not allowed to change visibility",
      "variant":"error"
    })
  }
  }
);


// @type    POST
//@route    /api/v1/addition/myService/:id
// @desc    route to update/edit service
// @access  PRIVATE
async function updateMe(req,res,serviceValues){

  Business.findOneAndUpdate(
    { _id: req.params.id },
    { $set: serviceValues },
    { new: true }
  )
    .then(service => {
      if (service){
        res.json({ message: "Updated successfully!!", variant: "success" })

      } else {
        res.json({ message: "Id not found", variant: "error" })

      }
    }        
    )
    .catch(err =>
      console.log("Problem in updating service myValue" + err)
    );
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    
    const serviceValues = {   
      category:{},
      subCategory:{}
   };
    serviceValues.user = req.user.id;
    if(req.body.serviceName)serviceValues.serviceName = req.body.serviceName;
   //link start
    if(req.body.link){
      var stru = req.body.link;
      var restu = stru.replace(/  | |   |    |      /gi, function (x) {
        return  "";
      });
      serviceValues.link = restu.toLowerCase()
    };

//link end
if( req.body.category.categoryName)serviceValues.category.categoryName = req.body.category.categoryName;
if(req.body.category.link)serviceValues.category.link = req.body.category.link;
if(req.body.subCategory.subCategoryName)serviceValues.subCategory.subCategoryName = req.body.subCategory.subCategoryName;
if(req.body.subCategory.link)serviceValues.subCategory.link = req.body.subCategory.link;  
if(req.body.description)serviceValues.description = req.body.description;
    Business.findOne({serviceName: serviceValues.serviceName})
          .then(service => {
            if(service){
              caId = service._id;
              if (caId == req.params.id) {
                Business.findOne({link:serviceValues.link || "df#$@g#*&"})     
          .then(service => {
            if(service) {
              const catId = service._id;
              if (catId == req.params.id){
                updateMe(req,res,serviceValues)
              } else {
res.json({message: "This Link Already Exist", variant: "error"})

              }

            }else{
              updateMe(req,res,serviceValues)

            }
          })
          .catch(err => console.log( `error in link matching ${err}`))

              }else {
                  res.json ({message: "This title already exist", variant : "error"})

              }
            } else {

              Business.findOne({link:serviceValues.link || "df#$@g#*&"})     
              .then(service => {
                if(service) {
                  const catId = service._id;
                  if (catId == req.params.id){
                    updateMe(req,res,serviceValues)
                  } else {
    res.json({message: "This Link Already Exist", variant: "error"})
    
                  }
    
                }else{
                 updateMe(req,res,serviceValues)
    
                }
              })
              .catch(err => console.log( `error in link matching ${err}`))

            }
          })
          .catch(err => console.log(`Error in title matching ${err}`))

}
);

///////
// /api/v1/addition/myService/delete/:id
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const id = req.params.id;
    Business.findOne({ _id: id }).then(catData => {
      if (catData) {
        Business.findOneAndDelete({ _id: id })
          .then(() =>
            res.json({ message: "Deleted successfully", variant: "success" })
          )
          .catch(err =>
            res.json("Failed to delete due to this error - " + err)
          );
      } else {
        res
          .status(400)
          .json({ message: "service Not Found", variant: "error" });
      }
    });
 
  }
);

// @type    GET
//@route    /api/v1/addition/myService/allservice/:searchservice
// @desc    route for searching of service from searchbox using any text
// @access  PRIVATE
router.get(
  "/allservice/:searchservice",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var des = req.user.designation;
    var des1 = "Admin";
    const search = req.params.searchservice;

    if (des == des1   ) {
    if (isNaN(search)) {
      Business.find({
        serviceName: new RegExp(search, "i")
      }).then(Business => res.json(Business)).catch(err => res.json({message: "Problem in Searching" + err, variant: "success"}));
    } 

  } else {
    res.json({ message: "You are not Authorised", variant: "error" })
  }

  }
);


module.exports = router;
