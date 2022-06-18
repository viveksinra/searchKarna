// THis is eith One

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "myUser"
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
designation: {
    label:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    }
}

});

module.exports = Location = mongoose.model("myLocation", LocationSchema);


// /cscLocator