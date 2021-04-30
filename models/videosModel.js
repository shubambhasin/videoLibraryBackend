const mongoose = require('mongoose')
const { Schema } = mongoose;

const videoSchema = new Schema({
 
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
     required: true
  },
  url: {
    type: String,
    unique: true
  },
  thumbnail: {
    type: String,
     required: true,
     unique: true
  },
  description: {
    type: String,
    minLength: 20,
    maxLength: 500,
    required: true
  },
  duration: {
    type: String
  },
   category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String
  },
  videoId: {
    type: String,
    required: true
  },
}, { timestamps: true })

const Video = mongoose.model('video', videoSchema)

module.exports = { videoSchema, Video}