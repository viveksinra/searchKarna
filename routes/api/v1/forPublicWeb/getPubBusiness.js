const express = require("express");
const router = express.Router();
const passport = require("passport");

const img = require("../../../../setup/myimageurl")

//Load User Model
const User = require("../../../../models/User");

//Load Category.js Model

const Business = require("../../../../models/Addition/Business")


// @type    get
//@route    /api/v1/forPublicWeb/getPubBusiness/getwithSubLink/dentists
// @desc    route to get business with sub category
// @access  public
router.get(
  "/getwithSubLink/:link",
//   passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let link = req.params.link;

    let allBusiness = await Business.aggregate([
        {$match: {"subCategory.link": link} },     
        {$project: { businessName: 1,link:1,
            contactPersonName:1,yearEstablished:1,state:1,district:1,contactNo1:1,
            img: { $arrayElemAt: [ "$allImage.imgUrl", 0 ] },
          }  }
    
        ]).exec()

        res.json(allBusiness)

  }
);
// business
// @type    get
//@route    /api/v1/forPublicWeb/getPubBusiness/getOne/:link
// @desc    route to get single service by id
// @access  PRIVATE
router.get(
  "/getOne/:link",

  (req, res) => {
    Business.findOne({
      link: req.params.link
    }).then(Business => res.json(Business)).catch(err => res.json({message: "Problem in finding With this Id", variant: "error"}));
  }
);



module.exports = router;
