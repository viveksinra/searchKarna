const express = require("express");
const router = express.Router();
const passport = require("passport");

const img = require("../../../../setup/myimageurl")

//Load User Model
const User = require("../../../../models/User");

//Load Category.js Model
const Category = require("../../../../models/Addition/Category");
const SubCategory = require("../../../../models/Addition/SubCategory");



// @type    get
//@route    /api/v1/forPublicWeb/catSubCat/getSubWithLogo/:link
// @desc    route to get subcategory with category
// @access  PRIVATE
router.get(
  "/getSubWithLogo/:link",
//   passport.authenticate("jwt", { session: false }),
  async(req, res) => {
   let link = req.params.link;

    let allSubCategory = await SubCategory.aggregate([
        {$match: {"category.link": link} },     
        {$project: { subCategoryName: 1,link:1,logo:1,category:1 }  }
    
        ]).exec()

        res.json(allSubCategory)

  }
);





module.exports = router;
