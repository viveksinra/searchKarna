const excel = require('node-excel-export');
const express = require("express");
const router = express.Router();
const passport = require("passport");
// You can define styles as json object
const styles = {
  headerDark: {
    fill: {
      fgColor: {
        rgb: '191970'
      }
    },
    font: {
      color: {
        rgb: 'FFFFFFFF'
      },
      sz: 14,
      bold: true,
      align: 'center',
    }
  },

  headerLight: {
    fill: {
      fgColor: {
        rgb: 'FFFFFFFF'
      }
    },
    font: {
      color: {
        rgb: '00000000'
      },
      sz: 14,
      bold: true,
      align: 'center',
    }
  }
};
 

//Here you specify the export structure
const specification = {
    // visibility: { label: 'Public', id: 'public' },
    // createdByUser: '628a98f7eaa0321c2c787ce0',
    // lastUpdatedByUser: '',
    // link: 'dfgsdfgd',
    // pincode: '156565',
    // landmark: 'fsdfg',
    // registrationNo: '456565656',
    // receiptNo: '5656',
    // contactPersonName: 'on 24th 11pm',
    // contactNo: '4648486484',
    // businessName: 'dfgsdfgsd',
    // emailId: 'dfgsdfg',
    // website: 'dfgsdfg',
    // yearEstablished: '2004',
    // modesOfPayment: 'Card',
    // latitude: '',
    // longitude: '',
    // category: { categoryName: 'check', link: 'checklink' },
    // subCategory: { subCategoryName: 'with Check Category', link: 'linking' },
    // myServices: { serviceName: 'Check', link: 'CheckLinkss' },
    // user: 628a98f7eaa0321c2c787ce0,
    // creationDate: 2022-05-24T18:46:15.823Z,
    // state: 'Bihar',
    // district: 'Purnea',
    // tahsilBlock: 'talaya',
    // village: 'kiskan',
    // date: 2022-05-24T19:46:16.051Z,

  ['visibility.label']: { 
    displayName: 'Visibility_Label', 
    headerStyle: styles.headerLight, 
  
    width: 100 // <- width in pixels
  },
  'visibility.id': { 
    displayName: 'Visibility_ID', 
    headerStyle: styles.headerLight, 
  
    width: 100 // <- width in pixels
  },  
  lastUpdatedByUser: { 
    displayName: 'Last_Updated_By_User', 
    headerStyle: styles.headerDark, 
  
    width: 100 
  },
    link: {
    displayName: 'Link',
    headerStyle: styles.headerDark,
    width: 100
    },
    pincode: {
    displayName: 'Pincode',
    headerStyle: styles.headerDark,
    width: 100
    },
    landmark: {
    displayName: 'Landmark',
    headerStyle: styles.headerDark,
    width: 100
    },
    registrationNo: {
    displayName: 'Registration_No',
    headerStyle: styles.headerDark,
    width: 100
    },
    receiptNo: {
    displayName: 'Receipt_No',
    headerStyle: styles.headerDark,
    width: 100
    },
    contactPersonName: {
    displayName: 'Contact_Person_Name',
    headerStyle: styles.headerDark,
    width: 100
    },
    contactNo: {
    displayName: 'Contact_No',
    headerStyle: styles.headerDark,
    width: 100
    },
    businessName: {
    displayName: 'Business_Name',
    headerStyle: styles.headerDark,
    width: 100
    },
    emailId: {
    displayName: 'Email_Id',
    headerStyle: styles.headerDark,
    width: 100
    },
    website: {
    displayName: 'Website',
    headerStyle: styles.headerDark,
    width: 100
    },


}
 
// The data set should have the following shape (Array of Objects)
// The order of the keys is irrelevant, it is also irrelevant if the
// dataset contains more fields as the report is build based on the
// specification provided above. But you should have all the fields
// that are listed in the report specification

 
// Create the excel report.
// This function will return Buffer

router.post('/exportMe',
passport.authenticate("jwt", { session: false }),
async(req,res) => {

  console.log(req.body);
  /////
    // You can then return this straight
let startDate = req.body.startDate;
let endDate = req.body.endDate;

if(startDate !== ''){

  res.json({
    'message':`Success`,
    'variant':"success",
    'link':`https://merekisan.in/api/sr/exportSr/downloadSr/${fixStartDate}`
})
} else {
  res.json({
    'message':`Error`,
    'variant':"error",
})
}

    
    // res.send('Done')

})

 

// OR you can save this buffer to the disk by creating a file.
 // /api/v1/addition/ven/exportVendor/downloadVendor
router.get('/downloadVendor',async(req,res) => {
console.log("downloadVendor")
//     let startData = new Date(req.body.startDate)
//     startData.setTime(startData.getTime() - (5 * 60 * 60 * 1000 + 30 * 60 * 1000));
//     let endDate = new Date(req.body.endDate)
//     endDate.setTime(endDate.getTime() - (5 * 60 * 60 * 1000 + 30 * 60 * 1000) + (24 * 60 * 60 * 1000));
//   let myMatch = {
//     creationDate: {}
//   }
//   if(req.body.startDate && req.body.endDate){ 
//     myMatch.creationDate = {
//       $gte: (new Date(startData)),
//        $lte: (new Date(endDate)),
//       }
//   }

//   if(req.body.visibility?.id != '' &&
//   req.body.visibility    ){ 
//     myMatch['visibility.id'] = req.body.visibility.id
//   }
//   if(req.body.supervisor?._id != '' &&
//     req.body.supervisor    
//   ){
//     myMatch["supervisor._id"] = req.body.supervisor._id
//   }
//   if(req.body.fieldPartner?._id != '' &&
//    req.body.fieldPartner?._id != null &&
//    req.body.fieldPartner
//    ){
//     myMatch["fieldPartner._id"] = req.body.fieldPartner._id
//   }
//   if(req.body.state != ''){
//     myMatch.state = req.body.state
//   }
//   if(req.body.district != ''){
//     myMatch.district = req.body.district
//   }
 let  myMatch = {
    creationDate: {
      '$gte': new Date('2022-05-23T18:30:00.000Z'),
      '$lte': new Date('2022-05-26T18:30:00.000Z')
    }
  }
  console.log(myMatch)
  let vendorData = await Vendor.aggregate([
    {$match: myMatch }, 
//    {$project: { category:1,
//       businessName:1,
//       modesOfPayment:1,
//       state:1,tahsilBlock:1 }  
//      }    
   ]).exec()
//    for(let i=0;i<vendorData.length;i++){
//      vendorData[i].categoryName = vendorData[i].category.categoryName
//    }


var dataset = [ ]
dataset = vendorData
console.log(dataset.length)


const report = excel.buildExport(
[ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
{
name: 'CRM Report', // <- Specify sheet name (optional)
//   heading: heading, // <- Raw heading array (optional)
//   merges: merges, // <- Merge cell ranges
specification: specification, // <- Report specification
data: dataset // <-- Report data
}
]
);
// You can then return this straight
res.attachment('vendorExport.xlsx'); // This is sails.js specific (in general you need to set headers)
return res.send(report);
res.send('Done')
})

// OR you can save this buffer to the disk by creating a file.
 // /api/sr/exportSr/exportMe


module.exports = router;


