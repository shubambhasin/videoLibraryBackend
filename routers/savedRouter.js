const express = require("express")
const router = express.Router()
const { Saved } = require('../models/savedModel.js')
const { decodeUserId } = require('../utils/decodeUserId')


// driver funtion

const addToSavedVideo = async ( userId, videoId, collectionName, res) => {

  const user = await Saved.find({ userId })
  // console.log("User from line 22", user, "h1111111111111111111111111111111111111", user[0])
 try{
    if(user.length === 0)
  {
    const newSaved = new Saved({
      userId: {userId},
      videos:[videoId]
    })
    await newSaved.save()
    const result = await Saved.findById({ userId}).populate('videos')
    res.json({result})
  }
  else{
    const videoAlreadyPresent = user[0].videos.includes(videoId)
    if(videoAlreadyPresent)
    {

    }
    else{
      await Saved.findByIdAndUpdate(user[0]._id, {
        $push: { videos: videoId}
      })
    }
      const result = await Saved.find({ userId}).populate('videos')
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
    const savedVideos = await Saved.find({userId}).populate('videos') 
    res.json({success: true, videos: savedVideos})
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
       addToSavedVideo(userId, videoData._id, Saved, res)
    }
    catch(error){
  console.log(error)
  res.json({success: false, error: error.message})
}

  

  

})

module.exports = router;


//  try {
//     const {name, date, thumbnail, url, duration, description, category, videoId, subCategory} = req.body

//     const alreadyPresent = await Saved.find({ videoId: videoId})

//     if(alreadyPresent)
//     {
//       await Saved.deleteOne({videoId: videoId})
//    }
//     const saved = new Saved( {
//       name: name, 
//       date: date, 
//       thumbnail: thumbnail, 
//       duration: duration, 
//       description: description, 
//       url: url,
//       category: category,
//       videoId: videoId,
//       subCategory: subCategory

//     })
//     const savedVideo = await saved.save()
//     console.log(savedVideo)
//     res.json({success: true, data: alreadyPresent})
//        } 
//    catch(err){
//         res.json({success: false, errorrrrr: err})
//     }