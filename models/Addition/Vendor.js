
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
      createdByUser: {
        type:String,
        default:""
      },
      lastUpdatedByUser: {
        type:String,
        default:""
        },
    link:{
       type:String,
       default:""
   },
   state: {
    type: String,
    required: true
},    
district: {
type: String,
required: true
},    
cityBlock: {
    type: String,
    required: true
}, 
areaName: {
    type: String,
    required: true
},
    pincode:{
       type:String,
       default:""
   },
    landmark:{
       type:String,
       default:""
   },
   registrationNo:{
       type:String,
       default:""
   },
   receiptNo:{
       type:String,
       default:""
   },
   contactPersonName:{
       type:String,
       default:""
   },
   contactNo1:{
       type:String,
       default:""
   },
   contactNo2:{
       type:String,
       default:""
   },
   contactNo3:{
       type:String,
       default:""
   },
   contactNo4:{
       type:String,
       default:""
   },
   businessName:{
       type:String,
       default:""
   },
   emailId:{
       type:String,
       default:""
   },
   website:{
       type:String,
       default:""
   },
   category:{
    categoryName:{
        type:String,
     //    required:true
    },
    link:{
         type:String,
         // required:true
    }
 
 },
subCategory:{
 subCategoryName:{
        type:String,
     //    required:true
    },
    link:{
         type:String,
         // required:true
    }
 
 },
 myServices:[{
    serviceName:{
        type:String,
     //    required:true
    },
    link:{
         type:String,
         // required:true
    }
   }],
   openingTime:{
    type:String,
    default:"09:00"
   },
   isOtpVerified:{
    type:Boolean,
    default:false
   },
   closingTime:{
    type:String,
    default:"20:00"
   },
   closedDays:[],

   
   yearEstablished:{
    type:String,
    default:""
},
   modesOfPayment:[ ],
 
   // to be auto detucted
   latitude:{
       type:String,
       default:""
   },
   longitude:{
       type:String,
       default:""
   },

   allImage:[
       {
        imgUrl:{
            type:String,
            default:""
        },
        imgId:{
            type:String,
            default:""
        }  
       }
   ],
   // pending public unlisted private
   visibility:{
       label:{
        type:String,
        default:"Pending"
       },
       id:{
        type:String,
        default:"pending"
       }
    
   },
   date: {
    type: Date,
    default: Date.now
  },
   creationDate: {
    type: Date,
    required:true
  },

});

module.exports = Vendor = mongoose.model("myVendor", VendorSchema);


// /Vendor