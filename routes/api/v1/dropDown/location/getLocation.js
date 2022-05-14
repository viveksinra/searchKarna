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
// districtName
// /api/v1/dropDown/location/getLocation/districtName
router.post('/districtName',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
        
        let state = req.body.state
        

    let U1 = await Location.aggregate([
        {$match: {state:state} },
        { $group : { _id : "$districtName" } }  
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
// tahsilBlock
// /api/v1/dropDown/location/getLocation/tahsilBlock
router.post('/tahsilBlock',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
    
    let state = req.body.state
    let districtName = req.body.districtName
    

    let U1 = await Location.aggregate([
        {$match: {state:state,districtName:districtName} },
        { $group : { _id : "$tahsilBlock" } }  
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


// village
// /api/v1/dropDown/location/getLocation/village
router.post('/village',
// passport.authenticate("jwt", { session: false }),
 async(req,res) => {
    
    let state = req.body.state
    let districtName = req.body.districtName
    let tahsilBlock = req.body.tahsilBlock
    
    let U1 = await Location.aggregate([
        {$match: {
            
            state:state,
            districtName:districtName,
            tahsilBlock:tahsilBlock,
            
        } },
        { $group : { _id : "$village" } }  
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