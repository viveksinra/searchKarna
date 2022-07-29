const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BarnaliDataSchema = new Schema({
  
 id:{
    type:String,
    default:""
 },
 mobileNo:{
    type:String,
    default:""
 },
 msg:{
    type:String,
    default:""
 },
  date: {
    type: Date,
    default: Date.now
  },

});

module.exports = BarnaliData = mongoose.model("myBarnaliData", BarnaliDataSchema);




