//
const express = require("express");
const router = express.Router();
const passport = require("passport");
var mongoose = require('mongoose');

const Location = require('../../../../../models/DropDown/Location');

// state
// /api/v1/dropDown/location/getLocation/state
router.post('/state',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {


    let U1 = await Location.aggregate([
        {$match: {} },
        { $group : { _id : "$state" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  

        let data = []
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data.push(U2)
            x++
        }
        res.json(data)

}
)
// district
// /api/v1/dropDown/location/getLocation/district
router.post('/district',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
        
        let state = req.body.state
        

    let U1 = await Location.aggregate([
        {$match: {state:state} },
        { $group : { _id : "$district" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  

        let data = []
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data.push(U2)
            x++
        }
        res.json(data)

}
)
// cityBlock
// /api/v1/dropDown/location/getLocation/cityBlock
router.post('/cityBlock',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
    
    let state = req.body.state
    let district = req.body.district
    

    let U1 = await Location.aggregate([
        {$match: {state:state,district:district} },
        { $group : { _id : "$cityBlock" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  

        let data = []
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data.push(U2)
            x++
        }
        res.json(data)

}
)


// areaName
// /api/v1/dropDown/location/getLocation/areaName
router.post('/areaName',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
    
    let state = req.body.state
    let district = req.body.district
    let cityBlock = req.body.cityBlock
    
    let U1 = await Location.aggregate([
        {$match: {
            
            state:state,
            district:district,
            cityBlock:cityBlock,
            
        } },
        { $group : { _id : "$areaName" } }  
        // {$project: { regNumber:1}},
    
    
        ]).exec()  

        let data = []
        let x = 0
        while(x<U1.length){
            let U2 = U1[x]._id
            data.push(U2)
            x++
        }
        res.json(data)

}
)

module.exports = router;