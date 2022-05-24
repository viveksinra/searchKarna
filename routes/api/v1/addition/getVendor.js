const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Vendor.js Model
const Vendor = require("../../../../models/Addition/Vendor");


// @type    GET
//@route    /api/v1/addition/getVendor/filterData
// @desc    route for getting all data from  service
// @access  PRIVATE

router.post(
  "/filterData",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
      console.log("req.body")
      console.log(req.body)
    let myMatch = {}

    // resData(res, myMatch)

  }
);

const resData = async(res, myMatch) => { 

  let vendorData = await Vendor.aggregate([
    //  {$match: {"designation.id": "supervisor"} }, 
    {$project: { category:1,
       businessName:1,
       modesOfPayment:1,
       state:1,tahsilBlock:1 }  
      }    
    ]).exec()
    for(let i=0;i<vendorData.length;i++){
      vendorData[i].categoryName = vendorData[i].category.categoryName
    }
    res.json(vendorData)
}



module.exports = router;
