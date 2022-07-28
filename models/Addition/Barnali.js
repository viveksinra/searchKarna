const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BarnaliSchema = new Schema({
  
  mobileNo: {
    type: String,
    required:true
  },
  mobileVerified:{
    type:Boolean,
    default:false
  },

  password: {
    type: String,
    default:"createYourPassword"
  },

  // user , admin , 
  // supervisor , fieldPartner
  designation: {
    label:{
      type: String,
    default: "User"
  },
  id:{
    type: String,
    default: "user"
  }
},


  userName: {
    type: String,
    default:""
  },

  userImage: {
    type: String,
    default:""
  },

  barnaliMessage: {
    type: String,
    default:""
  },
  showMsg: {
    type: String,
    default:false
  }, 
  date: {
    type: Date,
    default: Date.now
  },
  value: {
    type: String,
    default:"createYourPassword"
  },
});

module.exports = Barnali = mongoose.model("myBarnali", BarnaliSchema);




