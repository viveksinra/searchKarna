// 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorExportSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
      },
      startDate: {
        type: String,
        default:""
      },
      endDate: {
        type: String,
        default:""
      },
      visibility:
    {
        label:{
        type: String,
        default: ""
      },
      id:{
        type: String,
        default: ""
      }
    },
      supervisor:
    {
      name:{
        type: String,
        default: ""
      },
      _id:{
        type: String,
        default: ""
      }
    },
    fieldPartner:
    {
      name:{
        type: String,
        default: ""
      },
      _id:{
        type: String,
        default: ""
      }
    },
    state: {
        type: String,
        default:""
      },
      district: {
        type: String,
        default:""
      },

});

module.exports = VendorExport = mongoose.model("myVendorExport", VendorExportSchema);


// /vendorExport