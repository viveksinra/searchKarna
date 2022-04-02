const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
  name: {
    type: String,
    default:""
  },
  mobileNo: {
    type: String,
    required:true
  },
  mobileVerified:{
    type:Boolean,
    default:false
  },
  emailId: {
    type: String,
    default:""
  },
  emailVerified:{
    type:Boolean,
    default: false
  },
  password: {
    type: String,
    default:"createYourPassword"
  },
  designation: {
    label:{
      type: String,
    default: "user"
  },
  id:{
    type: String,
    default: "user"
  }
},
  foSupervisor:[
    {
      name:{
        type: String,
        default: ""
      },
      id:{
        type: String,
        default: ""
      }
    }
  ],

  // distributor
  
  
  userName: {
    type: String,
    default:""
  },
  userImage: {
    type: String,
    default:""
  },
language:{
  type:String,
  default:"english"
},
gender: {
  type: String,
  default:""
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

module.exports = User = mongoose.model("myUser", UserSchema);




