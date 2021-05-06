const mongoose = require('mongoose')
const { Schema } = mongoose;

const historySchema = new Schema({
 
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

const History = mongoose.model('history', historySchema)

module.exports = { historySchema, History}