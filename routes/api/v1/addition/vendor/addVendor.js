const express = require("express");
const router = express.Router();
const passport = require("passport");

const img = require("../../../../../setup/myimageurl")

//Load User Model
const User = require("../../../../../models/User");

//Load Vendor.js Model
const Vendor = require("../../../../../models/Addition/Vendor");

// @type    POST
//@route    /api/v1/addition/vendor/addVendor/
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
      myServices:{},
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

    serviceValues.category.categoryName = req.body.category.categoryName;
    serviceValues.category.link = req.body.category.link;
    serviceValues.subCategory.subCategoryName = req.body.subCategory.subCategoryName;
    serviceValues.subCategory.link = req.body.subCategory.link;
    serviceValues.myServices.serviceName = req.body.myServices.serviceName;
    serviceValues.myServices.link = req.body.myServices.link;


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
    else if(serviceValues.allImage.length<=2){
        res.json({
          message: "Please upload atleast Three images",
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
      
      serviceValues.registrationNo = `${date}${receiptNo}${FiveD}k`;

          Vendor.findOne({
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
                Vendor.findOne({
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

                       Vendor.findOne({
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
                        
                      new Vendor(serviceValues)
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
        "message":"Only Field Partners is allowed to Add Vendor",
        "variant":"error"
      })
    }
  }
);

// @type    GET
//@route    /api/v1/addition/vendor/addVendor/allservice
// @desc    route for getting all data from  service
// @access  PRIVATE

router.get(
  "/allservice",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Vendor.find({})
      .sort({ date: -1 })
      .then(Vendor => res.json(Vendor))
      .catch(err =>
        res
          .status(404)
          .json({ message: "No Vendor Found", variant: "error" })
      );
  }
);
// @type    GET
//@route    /api/v1/addition/vendor/addVendor/tableData
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

  let vendorData = await Vendor.aggregate([
    //  {$match: {"designation.id": "supervisor"} }, 
    {$project: { category:1,
       businessName:1,
       modesOfPayment:1,
       state:1,cityBlock:1 }  
      }    
    ]).exec()
    for(let i=0;i<vendorData.length;i++){
      vendorData[i].categoryName = vendorData[i].category.categoryName
    }
    res.json(vendorData)
}
// @type    GET
//@route    /api/v1/addition/vendor/addVendor/oneData
// @desc    route for getting all data from  service
// @access  PRIVATE

router.get(
  "/oneData/:id",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId(req.params.id);
    let vendorData = await Vendor.findOne({
      _id: id
    })
    .catch(err => res.json({
      message: "Problem in finding With this Id",
       variant: "error"}));
// console.log(vendorData)
let myData = []
myData.push({"myKey":"State", "myValue": vendorData.state})
myData.push({"myKey":"district", "myValue": vendorData.district})
myData.push({"myKey":"cityBlock", "myValue": vendorData.cityBlock})
myData.push({"myKey":"areaName", "myValue": vendorData.areaName})
myData.push({"myKey":"pincode", "myValue": vendorData.pincode})
myData.push({"myKey":"landmark", "myValue": vendorData.landmark})
myData.push({"myKey":"registrationNo", "myValue": vendorData.registrationNo})
myData.push({"myKey":"receiptNo", "myValue": vendorData.receiptNo})
myData.push({"myKey":"contactPersonName", "myValue": vendorData.contactPersonName})
myData.push({"myKey":"contactNo1", "myValue": vendorData.contactNo1})
myData.push({"myKey":"contactNo2", "myValue": vendorData.contactNo2})
myData.push({"myKey":"contactNo3", "myValue": vendorData.contactNo3})
myData.push({"myKey":"contactNo4", "myValue": vendorData.contactNo4})
myData.push({"myKey":"businessName", "myValue": vendorData.businessName})
myData.push({"myKey":"link", "myValue": vendorData.link})
myData.push({"myKey":"emailId", "myValue": vendorData.emailId})
myData.push({"myKey":"website", "myValue": vendorData.website})
myData.push({"myKey":"categoryName", "myValue": vendorData.category.categoryName})
myData.push({"myKey":"subCategoryName", "myValue": vendorData.subCategory.subCategoryName})
myData.push({"myKey":"serviceName", "myValue": vendorData.myServices.serviceName})
myData.push({"myKey":"yearEstablished", "myValue": vendorData.yearEstablished})
myData.push({"myKey":"latitude", "myValue": vendorData.latitude})
myData.push({"myKey":"longitude", "myValue": vendorData.longitude})
myData.push({"myKey":"modesOfPayment", "myValue": vendorData.modesOfPayment})

let locationLink = "#"
if(vendorData.longitude != undefined && vendorData.longitude != ""){
 locationLink = `https://maps.google.com/?q=${vendorData.latitude},${vendorData.longitude}`

}


        res.json({myData,visibility: vendorData.visibility, locationLink,allImage: vendorData.allImage})
  }
);

// @type    get
//@route    /api/v1/addition/vendor/addVendor/get/:id
// @desc    route to get single service by id
// @access  PRIVATE
router.get(
  "/get/:id",

  (req, res) => {
    Vendor.findOne({
      _id: req.params.id
    }).then(Vendor => res.json(Vendor)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);
// @type    POST
//@route    /api/v1/addition/vendor/addVendor/updateVisibility/:id
// @desc    route to update Vendor Visibility
// @access  PRIVATE
router.post(
  "/updateVisibility/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if(req.user.designation.id == "supervisor"){
    let vendorValue = {
      visibility: req.body.visibility
    }
    Vendor.findOne({
      _id: req.params.id
    }).then(
      data => {
        if(data){
          Vendor.findOneAndUpdate(
            { _id: req.params.id },
            { $set: vendorValue },
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
      "message":"Only Supervisor is allowed to change visibility",
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

  Vendor.findOneAndUpdate(
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
    Vendor.findOne({serviceName: serviceValues.serviceName})
          .then(service => {
            if(service){
              caId = service._id;
              if (caId == req.params.id) {
                Vendor.findOne({link:serviceValues.link || "df#$@g#*&"})     
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

              Vendor.findOne({link:serviceValues.link || "df#$@g#*&"})     
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
    Vendor.findOne({ _id: id }).then(catData => {
      if (catData) {
        Vendor.findOneAndDelete({ _id: id })
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
      Vendor.find({
        serviceName: new RegExp(search, "i")
      }).then(Vendor => res.json(Vendor)).catch(err => res.json({message: "Problem in Searching" + err, variant: "success"}));
    } 

  } else {
    res.json({ message: "You are not Authorised", variant: "error" })
  }

  }
);


module.exports = router;
