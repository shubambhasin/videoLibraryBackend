const mongoose = require('mongoose')
const { Schema } = mongoose;

const unlikedSchema = new Schema({
 
  name: {
    type: String
  },
  date: {
    type: String
  },
  url: {
    type: String
  },
  thumbnail: {
    type: String
  },
  description: {
    type: String
  },
  duration: {
    type: String
  },
   category: {
    type: String
  },
  subCategory: {
    type: String
  },
  videoId: {
    type: String
  },
}, { timestamps: true })

const Unliked = mongoose.model('unliked', unlikedSchema)

module.exports = { unlikedSchema, Unliked}