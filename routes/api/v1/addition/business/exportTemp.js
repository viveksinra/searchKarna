const excel = require('node-excel-export');
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Export
const ExportBusiness = require("../../../../../models/Export/ExportBusiness");
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
  businessName: {
    displayName: 'Business_Name',
    headerStyle: styles.headerDark,
    width: 100
    },
    link: {
    displayName: 'Link',
    headerStyle: styles.headerLight,
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
    contactNo1: {
    displayName: 'Contact_No1',
    headerStyle: styles.headerDark,
    width: 100
    },
    contactNo2: {
    displayName: 'Contact_No2',
    headerStyle: styles.headerDark,
    width: 100
    },
    contactNo3: {
    displayName: 'Contact_No3',
    headerStyle: styles.headerDark,
    width: 100
    },
    contactNo4: {
    displayName: 'Contact_No4',
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
    yearEstablished: {
    displayName: 'Year_Established',
    headerStyle: styles.headerDark,
    width: 100
    },
    modesOfPayment: {
    displayName: 'Modes_Of_Payment',
    headerStyle: styles.headerDark,
    width: 100
    },
    googleLink:{
    displayName: 'Google_Link',
    headerStyle: styles.headerDark,
    width: 100
    },
    latitude: {
    displayName: 'Latitude',
    headerStyle: styles.headerLight,
    width: 100
    },
    longitude: {
    displayName: 'Longitude',
    headerStyle: styles.headerLight,
    width: 100
    },

    creationDate: {
    displayName: 'Creation_Date', 
    headerStyle: styles.headerDark,
    width: 100
    },
    state: {
    displayName: 'State',
    headerStyle: styles.headerDark,
    width: 100
    },
    district: {
    displayName: 'District',
    headerStyle: styles.headerDark,
    width: 100
    },
    cityBlock: {
    displayName: 'Tahsil_Block',
    headerStyle: styles.headerDark,
    width: 100
    },
    areaName: {
    displayName: 'AreaName',
    headerStyle: styles.headerDark,
    width: 100
    },

    visibilityLabel: {
    displayName: 'Visibility_Label',
    headerStyle: styles.headerDark,
    width: 100
    },
    visibilityId: {
    displayName: 'Visibility_Id',
    headerStyle: styles.headerLight,
    width: 100
    },
    categoryName: {
    displayName: 'Category_Name',
    headerStyle: styles.headerDark,
    width: 100
    },
    categoryLink: {
    displayName: 'Category_Link',
    headerStyle: styles.headerLight,
    width: 100
    },
    subCategoryName: {
    displayName: 'Sub_Category_Name',
    headerStyle: styles.headerDark,
    width: 100
    },
    subCategoryLink: {
    displayName: 'Sub_Category_Link',
    headerStyle: styles.headerLight,
    width: 100
    },
    allImageUrl: {
    displayName: 'All_Image_Url',
    headerStyle: styles.headerDark,
    width: 100
    },
    allImageId: {
    displayName: 'All_Image_Id',
    headerStyle: styles.headerLight,
    width: 100
    },

}


module.exports.exportData = function async(res, businessData) { 
console.log("businessData",businessData);
var dataset = [ ]
dataset = businessData


const report = excel.buildExport(
[ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
{
name: 'Business Data', // <- Specify sheet name (optional)
//   heading: heading, // <- Raw heading array (optional)
//   merges: merges, // <- Merge cell ranges
specification: specification, // <- Report specification
data: dataset // <-- Report data
}
]
);
// You can then return this straight
res.attachment('businessExport.xlsx'); // This is sails.js specific (in general you need to set headers)
res.send("Download will start soon");

}



