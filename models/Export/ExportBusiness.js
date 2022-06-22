
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExportBusinessSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
},
startDate: {
  type: String,
  default: ""  
  },
  endDate: {
    type: String,
  default: ""  
  },
  visibility: {
     label:{
      type: String,
      default: ""  
        },
          id:{
            type: String,
            default: ""  
      
     }
  },
  supervisor: {
        _id:{
          type: String,
          default: ""  
        },
        name:{
          type: String,
          default: ""  
        }
  },
  fieldPartner: {
        _id:{
          type: String,
          default: ""  
        },
        name:{
          type: String,
          default: ""  
        }
    },
    
  state: {
    type: String,
    default: ""  
  },
  district: {
    type: String,
    default: ""  
  },
  isUsed:{
    type: Boolean,
    default: false
  },

     
   date: {
    type: Date,
    default: Date.now
  },
});

module.exports = ExportBusiness = mongoose.model("myExportBusiness", ExportBusinessSchema);


// /ExportBusiness