const express = require("express")
const router = express.Router()
const { History } = require('../models/historyModel.js')

router.route('/')
.get( async (req, res) => {

  const history = await History.find() 
  res.status(200).send(history)
})
.post( async (req, res) => {

   try {
    const {name, date, thumbnail, url, duration, description, category, videoId, subCategory} = req.body

    const alreadyPresent = await History.find({ videoId: videoId})

    if(alreadyPresent)
    {
      await History.deleteOne({videoId: videoId})
   }
    const history = new History( {
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
    const savedHistory = await history.save()
    console.log(savedHistory)
    res.json({success: true, data: alreadyPresent})
       } 
   catch(err){
        res.json({success: false, errorrrrr: err})
    }

})

module.exports = router;