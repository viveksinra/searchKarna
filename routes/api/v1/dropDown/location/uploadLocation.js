//
const express = require("express");
const router = express.Router();
const passport = require("passport");
var mongoose = require('mongoose');

const ExcelToJson = require('./../../other/excelToJson')


const Location = require('../../../../../models/DropDown/Location');

// /api/v1/dropDown/location/uploadLocation/check
router.post('/check',
passport.authenticate("jwt", { session: false }),
 async(req,res) => {
 console.log("going to convert excel in json")
  let data =  await ExcelToJson.excelToJsonFn(res,res,req.files.photo)
  console.log("Convert Done")
  console.log(data)
let data1 = data[0]
  if( data1.state && 
    data1.district && data1.cityBlock &&
     data1.areaName ){
         console.log('Inside if')
        let x = 0 ;
console.log(x < data.length)
        while(x < data.length){

            console.log(`While loop Number ${x}`)
           let data1 = data[x]
           console.log(data1)
           await checkLocation(req,res,data1)
         
           
           x++
        }
        res.json({'message':'Upload Completed',
        'variant':'success'})

     }else {
        console.log('Inside else')

        res.json({'message':'Mandatory Field Missing',
                    'variant':'error'})
     }


})


// Crop Name
const checkLocation = async(req,res,data1) => {
if(data1.state && 
    data1.district && data1.cityBlock &&
     data1.areaName ){
        let myValue = {
            state:(data1.state).trim(), 
            district:(data1.district).trim(),
            cityBlock:(data1.cityBlock).trim(),
            areaName:(data1.areaName).trim(),         
           }
               
           let U1 = await Location.aggregate([
            {$match: myValue },  
            {$project: { state: 1 }},       
            ]).exec()  
        
            if(U1.length > 0){
                    console.log("Duplicate Data Found")
            }else{
             myValue.user = req.user.id
             myValue.designation = req.user.designation
             saveData(myValue)
            }
        
     } else {
        console.log("Required Field Missing")
     }
  


}

const saveData = async(myValue) => {
console.log("saving data")
    
    await new Location(myValue)
    .save()
    .then(console.log(`Date saved`))
    .catch(err => console.log(err))
}


// location master count
// /api/upload/uploadLocation/locationCount
router.get('/locationCount',async(req, res) =>{
    let U1 = await Location.aggregate([     
        {
            $count: "size"
          }
    ]).exec()
if(U1.length>0){
    let count = U1[0].size
    console.log(U1)
    res.send(`Location master size is ${count}`)
} else {
    res.send(U1)
}
})


module.exports = router;
