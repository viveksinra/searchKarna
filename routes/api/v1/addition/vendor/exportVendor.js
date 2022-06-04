const excel = require('node-excel-export');
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Export
const ExportVendor = require("../../../../../models/Export/ExportVendor");
const exportTemp = require("./exportTemp");
// You can define styles as json object

router.post(
  '/createExportId',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let filterData = {visibility:{},supervisor:{},fieldPartner:{}}
    filterData.user = req.user._id;
 
    if(req.body.startDate)filterData.startDate = req.body.startDate
    if(req.body.endDate)filterData.endDate = req.body.endDate
   if(req.body.visibility?.label)filterData.visibility.label = req.body.visibility.label
  if(req.body.visibility?.id)filterData.visibility.id = req.body.visibility.id
  if(req.body.supervisor?._id)filterData.supervisor._id = req.body.supervisor._id
  if(req.body.supervisor?.name)filterData.supervisor.name = req.body.supervisor.name
  if(req.body.fieldPartner?._id)filterData.fieldPartner._id = req.body.fieldPartner._id
  if(req.body.fieldPartner?.name)filterData.fieldPartner.name = req.body.fieldPartner.name
  if(req.body.state)filterData.state = req.body.state
  if(req.body.district)filterData.district = req.body.district
  new ExportVendor(filterData)
  .save()
  .then(exportVendor => {
    res.json({
    id: exportVendor._id,
    "message": 'ExportVendor created successfully',
    "variant": 'success'
    })
    })
    .catch(err => {
    res.json({
    "message": 'Error creating ExportVendor',
    "variant": 'error'
    })
  })



  }
)
 
// OR you can save this buffer to the disk by creating a file.
 // /api/v1/addition/vendor/exportVendor/downloadVendor/46
 router.get('/downloadVendor/:id',async(req,res) => {
  ObjectId = require('mongodb').ObjectID;

  let filterData = await ExportVendor.aggregate([
    {$match: {_id: ObjectId(req.params.id)} }, 
   ]).exec()

   let myFilterData = filterData[0]
 if(myFilterData){ 
   if(myFilterData.isUsed == false)
  { let startData = new Date(myFilterData.startDate)
  startData.setTime(startData.getTime() - (5 * 60 * 60 * 1000 + 30 * 60 * 1000));
  let endDate = new Date(myFilterData.endDate)
  endDate.setTime(endDate.getTime() - (5 * 60 * 60 * 1000 + 30 * 60 * 1000) + (24 * 60 * 60 * 1000));
let myMatch = {
  creationDate: {}
}
if(myFilterData.startDate && myFilterData.endDate){ 
  myMatch.creationDate = {
    $gte: (new Date(startData)),
     $lte: (new Date(endDate)),
    }
}

if(myFilterData.visibility?.id != '' &&
myFilterData.visibility    ){ 
  myMatch['visibility.id'] = myFilterData.visibility.id
}
if(myFilterData.supervisor?._id != '' &&
  myFilterData.supervisor    
){
  myMatch["supervisor._id"] = myFilterData.supervisor._id
}
if(myFilterData.fieldPartner?._id != '' &&
 myFilterData.fieldPartner?._id != null &&
 myFilterData.fieldPartner
 ){
  myMatch["fieldPartner._id"] = myFilterData.fieldPartner._id
}
if(myFilterData.state != ''){
  myMatch.state = myFilterData.state
}
if(myFilterData.district != ''){
  myMatch.district = myFilterData.district
}

let vendorDataLength = await Vendor.aggregate([
 {$match: myMatch },
 {"$group": {"_id": null, "count": {"$sum": 1}}},    
]).exec()
if(vendorDataLength[0].count <=25000){
if(vendorDataLength[0].count >=1 ){

let vendorData = await Vendor.aggregate([
 {$match: myMatch },    
]).exec()
for(let i = 0; i < vendorData.length; i++){
  vendorData[i].creationDate = vendorData[i].creationDate?.toLocaleString()
  vendorData[i].lastUpdateDate = vendorData[i].lastUpdateDate?.toLocaleString()
  vendorData[i].visibilityLabel = vendorData[i].visibility?.label
  vendorData[i].visibilityId = vendorData[i].visibility?.id
  vendorData[i].categoryName = vendorData[i].category?.categoryName
  vendorData[i].categoryLink = vendorData[i].category?.link
  vendorData[i].subCategoryName = vendorData[i].subCategory?.subCategoryName
  vendorData[i].subCategoryLink = vendorData[i].subCategory?.link
  vendorData[i].googleLink = `https://maps.google.com/?q=${vendorData[i].latitude},${vendorData[i].longitude}`
  let allImage = vendorData[i].allImage
if(allImage){
if(allImage.length > 0){
  let allImageUrl = allImage[0].imgUrl
  let allImageId = allImage[0].imgId
  for(let j = 1; j < allImage.length; j++){
    allImageUrl += `, ${allImage[i].imgUrl}`
    allImageId += `, ${allImage[i].imgId}`
  }
  vendorData[i].allImageUrl = allImageUrl
  vendorData[i].allImageId = allImageId
} 
}
}
exportTemp.exportData(res, vendorData)
}else {
  res.send('No Data Found With These Parameter')
}
}else {
  res.send('More Than 25k data in the filter')
}
 }else {
  res.send('Please Create Another Link')
}
}
else {
  res.send('No Data Found')
}
}
);


module.exports = router;


