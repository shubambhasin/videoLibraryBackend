const mongoose = require('mongoose')
const { Schema } = mongoose;

const historySchema = new Schema({
 
  userId: {type: Schema.Types.ObjectId, ref: "signup"},
  videos: [{
    type: Schema.Types.ObjectId,
    ref: "video"
  }]
}, { timestamps: true })

const History = mongoose.model('history', historySchema)

module.exports = { historySchema, History}