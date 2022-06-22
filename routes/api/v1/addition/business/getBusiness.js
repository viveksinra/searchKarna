const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Business.js Model
const Business = require("../../../../../models/Addition/Business");


// @type    GET
//@route    /api/v1/addition/business/getBusiness/filterData
// @desc    route for getting all data from  service
// @access  PRIVATE

router.post(
  "/filterData",
  // passport.authenticate("jwt", { session: false }),
  async(req, res) => {
      let startData = new Date(req.body.startDate)
      startData.setTime(startData.getTime() - (5 * 60 * 60 * 1000 + 30 * 60 * 1000));
      let endDate = new Date(req.body.endDate)
      endDate.setTime(endDate.getTime() - (5 * 60 * 60 * 1000 + 30 * 60 * 1000) + (24 * 60 * 60 * 1000));
    let myMatch = {
      creationDate: {}
    }
    if(req.body.startDate && req.body.endDate){ 
      myMatch.creationDate = {
        $gte: (new Date(startData)),
         $lte: (new Date(endDate)),
        }
    }

    if(req.body.visibility?.id != '' &&
    req.body.visibility    ){ 
      myMatch['visibility.id'] = req.body.visibility.id
    }
    if(req.body.supervisor?._id != '' &&
      req.body.supervisor    
    ){
      myMatch["supervisor._id"] = req.body.supervisor._id
    }
    if(req.body.fieldPartner?._id != '' &&
     req.body.fieldPartner?._id != null &&
     req.body.fieldPartner
     ){
      myMatch["fieldPartner._id"] = req.body.fieldPartner._id
    }
    if(req.body.state != ''){
      myMatch.state = req.body.state
    }
    if(req.body.district != ''){
      myMatch.district = req.body.district
    }
    getBusinessData(res, myMatch)



  }
);

const getBusinessData = async(res, myMatch) => { 

  let businessData = await Business.aggregate([
     {$match: myMatch }, 
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
//@route    /api/v1/addition/business/getBusiness/withoutFilterData
// @desc    route for getting all data from  service
// @access  PRIVATE

router.post(
  "/withoutFilterData",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {
    let myMatch = {}
    businessData = []
    if(req.user.designation.id == "admin" )
   {
      getBusinessData(res, myMatch)
    }else {
      res.json(businessData)
    }

  }
);


module.exports = router;
