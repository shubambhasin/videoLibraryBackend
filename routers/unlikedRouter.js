const express = require("express")
const router = express.Router()
const { Unliked } = require('../models/unlikedModel.js')
const { Liked } = require('../models/likedModel.js')

router.route('/')
.get( async (req, res) => {

  const unliked = await Unliked.find() 
  res.status(200).send(unliked)
})
.post( async (req, res) => {

   try {
    const {name, date, thumbnail, url, duration, description, category, videoId, subCategory} = req.body

    const alreadyPresentinUnliked = await Unliked.find({ videoId: videoId})
    const alreadyPresentinLiked = await Liked.find({ videoId: videoId})
    if(alreadyPresentinUnliked)
    {
      await Unliked.deleteOne({videoId: videoId})
   }
       if(alreadyPresentinLiked)
    {
      await Liked.deleteOne({videoId: videoId})
   }
    const unliked = new Unliked( {
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
    const savedUnliked = await unliked.save()
    console.log(savedUnliked)
    res.json({success: true, data: alreadyPresent})
       } 
   catch(err){
        res.json({success: false, errorrrrr: err})
    }

})

module.exports = router;