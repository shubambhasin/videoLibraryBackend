const express = require("express")
const router = express.Router()
const { Liked } = require('../models/likedModel.js')
const { Unliked } = require('../models/unlikedModel.js')
const { decodeUserId } = require('../utils/decodeUserId')

// driver function 
const addToLikedVideo = async (userId, videoId, Liked, res) => {

   const user = await Liked.find({ userId })
   console.log("from line 11", userId)
 try{
    if(user.length === 0)
  {
    const newLiked = new Liked({
      userId: {userId},
      videos:[videoId]
    })
    await newLiked.save()
    const result = await Liked.findById({ userId}).populate('videos')
    res.json({result})
  }
  else{
    const videoAlreadyPresent = user[0].videos.includes(videoId)
    if(videoAlreadyPresent)
    {

    }
    else{
      await Liked.findByIdAndUpdate(user[0]._id, {
        $push: { videos: `${videoId}`}
      })
    }
      const result = await Liked.find({ userId}).populate('videos')
      res.json({success: true, result})
  }
 } catch(error)
 {
   console.log(error)
   res.json({success: false, error: error.message})
 }
}

router.route('/')
.get( async (req, res) => {

 const token = req.headers.authorization
  try{
    const userId = decodeUserId(token);
    const likedVideos = await Liked.find({userId}).populate('videos') 
    res.json({success: true, videos: likedVideos})
  }
  catch(error)
  {
    res.json({success: false, error: error.message})
  }

})
.post( async (req, res) => {
  const token = req.headers.authorization
    const videoData = req.body.videoData   
    try {
      
       const userId = decodeUserId( token )
      //  console.log("USer id from:::::####", userId)
       addToLikedVideo(userId, videoData._id, Liked, res)
    }
    catch(error){
  console.log(error)
  res.json({success: false, error: error.message})
    }
})

module.exports = router;