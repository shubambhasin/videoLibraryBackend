const express = require("express")
const router = express.Router()
const { Video } = require('../models/videosModel.js')
router.route('/')
.get( async (req, res) => {

  const videos = await Video.find() 
  res.status(200).json({ success: true, data: videos })
})
.post( async (req, res) => {

   try {
    const {name, date, thumbnail, url, duration, description, category, videoId, subCategory} = req.body
    const video = new Video( {
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
    const savedVideo = await video.save()
    console.log(savedVideo)
    res.json({success: true, data: savedVideo})
       } 
   catch(err){
        res.json({success: false, errorrrrr: err})
    }

})

module.exports = router;