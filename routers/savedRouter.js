const express = require("express")
const router = express.Router()
const { Saved } = require('../models/savedModel.js')

router.route('/')
.get( async (req, res) => {

  const saved = await Saved.find() 
  res.status(200).send(saved)
})
.post( async (req, res) => {

   try {
    const {name, date, thumbnail, url, duration, description, category, videoId, subCategory} = req.body

    const alreadyPresent = await Saved.find({ videoId: videoId})

    if(alreadyPresent)
    {
      await Saved.deleteOne({videoId: videoId})
   }
    const saved = new Saved( {
      name: name, 
      date: date, 
      thumbnail: thumbnail, 
      duration: duration, 
      description: description, 
      url: url,
      category: category,
      videoId: videoId,
      subCategory: subCategory

    })
    const savedVideo = await saved.save()
    console.log(savedVideo)
    res.json({success: true, data: alreadyPresent})
       } 
   catch(err){
        res.json({success: false, errorrrrr: err})
    }

})

module.exports = router;