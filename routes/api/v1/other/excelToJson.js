// Requiring the module
const reader = require('xlsx')

var express = require("express");
const app = express();

exports.excelToJsonFn = (req, res,myPhoto) =>{

    const file2 = myPhoto;
    const file = reader.readFile(file2.tempFilePath)
    let data = []
  
    const sheets = file.SheetNames


    
    for(let i = 0; i < sheets.length; i++)
    {
    const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
    temp.forEach((res) => {
        data.push(res)
    })
    }
    
    // Printing data
    console.log('data')
    console.log(data)

        return(data)


    // res.json('data send')
}
