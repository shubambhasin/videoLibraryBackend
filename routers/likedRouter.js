const express = require("express")
const router = express.Router()
const { Liked } = require('../models/likedModel.js')
const { Unliked } = require('../models/unlikedModel.js')

router.route('/')
.get( async (req, res) => {

  const liked = await Liked.find() 
  res.status(200).send(liked)
  

})
.post( async (req, res) => {

   try {
    const {name, date, thumbnail, url, duration, description, category, videoId, subCategory} = req.body

    const alreadyPresentInLiked = await Liked.find({ videoId: videoId})
    const alreadyPresentInUnliked = await Unliked.find({videoId: videoId})

    if(alreadyPresentInLiked)
    {
      await Liked.deleteOne({videoId: videoId})
    }
    if(alreadyPresentInUnliked)
    {
      await Unliked.deleteOne({videoId: videoId})
    }
    const liked = new Liked( {
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
    const savedLiked = await liked.save()
    console.log(savedLiked)
    res.json({success: true, data: alreadyPresentInLiked})
       } 
   catch(err){
        res.json({success: false, errorrrrr: err})
    }

})

module.exports = router;