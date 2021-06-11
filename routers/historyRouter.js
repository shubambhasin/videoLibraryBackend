const express = require("express")
const router = express.Router()
const { decodeUserId } = require('../utils/decodeUserId.js')
const mySecret = process.env['secret']
const jwt = require('jsonwebtoken')
const { History } = require('../models/historyModel.js')

const addToHistory = async ( userId, videoId, History, res) => {

  const user = await History.find({ userId })
 try{
    if(user.length === 0)
  {
    const newHistory = new History({
      userId: { userId },
      videos:[videoId]
    })
    await newHistory.save()
    const result = await History.findById({ userId}).populate('videos')
    res.json({result})
  }
  else{
    const videoAlreadyPresent = user[0].videos.includes(videoId)
    if(videoAlreadyPresent)
    {

    }
    else{
      await History.findByIdAndUpdate(user[0]._id, {
        $push: { videos: videoId}
      })
    }
      const result = await History.findById({ userId}).populate('videos')
      res.json({result})


  }
 } catch(error)
 {
   console.log(error)
   res.json({success: false, error: error.message})
 }
}


// routing starts here....///
router.route('/')
.get( async (req, res) => {
  
  const userId = decodeUserId(req.headers.authorization)
  console.log(userId)
try{
    const history = await History.find({ userId }).populate('videos') 
  res.status(200).json(history)
}
catch(error)
  {
    console.log(error)
    res.json({success: false, error: error.message})
  }
})
.post( async (req, res) => {
  const token = req.headers.authorization
  const videoData = req.body.videoData
  console.log(videoData)
try {
      const userId = decodeUserId( token )
      console.log("USer id from:::::####", userId)
      addToHistory(userId, videoData._id, History, res)
      
    }
catch(error){
  console.log(error)
}

}

)

module.exports = router;





  //   const {name, date, thumbnail, url, duration, description, category, videoId, subCategory} = req.body

  //   const alreadyPresent = await History.find({ videoId: videoId})

  //   if(alreadyPresent)
  //   {
  //     await History.deleteOne({videoId: videoId})
  //  }
  //   const history = new History( {
  //     name: name, 
  //     date: date, 
  //     thumbnail: thumbnail, 
  //     duration: duration, 
  //     description: description, 
  //     url: url,
  //     category: category,
  //     videoId: videoId,
  //     subCategory: subCategory

  //   })
  //   const savedHistory = await history.save()
  //   console.log(savedHistory)
  //   res.json({success: true, data: alreadyPresent})
  //      } 
  //  catch(err){
  //       res.json({success: false, errorrrrr: err})
  //   }
