const express = require('express')
const router = express.Router()
const HistoryVideos = require('../models/historyModel.js') 

router.route('/')
.get( async( req, res) => {

  try{
  const videos = await HistoryVideos.find()

  res.status(200).json({success: true, data: videos})

  }catch(err)
  {
    res.json({ success: false, error: err})
  }

})
.post( async( req, res) => {

  

})
