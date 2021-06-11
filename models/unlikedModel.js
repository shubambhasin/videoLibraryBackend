const mongoose = require('mongoose')
const { Schema } = mongoose;

const unlikedSchema = new Schema({
 
 userId: {
    type: Schema.Types.ObjectId, 
    ref: "signup"},
  videos: [{
    type: Schema.Types.ObjectId,
    ref: "video"
  }]
}, { timestamps: true })

const Unliked = mongoose.model('unliked', unlikedSchema)

module.exports = { unlikedSchema, Unliked}