const { getLinkPreview, getPreviewFromContent } = require("link-preview-js");

const express = require("express");
const router = express.Router();


const axios = require("axios")



// /api/v1/addition/linkPrev/linkData
router.post('/linkData', async(req,res) => {
    let link = ""
    link = req.body.link
   // pass the link directly
getLinkPreview(link).then((data) =>
res.json(data)
);
})





module.exports = router;
