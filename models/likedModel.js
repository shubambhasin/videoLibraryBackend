const mongoose = require('mongoose')
const { Schema } = mongoose;

const likedSchema = new Schema({
 
 userId: {
    type: mongoose.SchemaTypes.ObjectId, 
    ref: "signup"},
  videos: [{
    type: Schema.Types.ObjectId,
    ref: "video"
  }]
}, { timestamps: true })

const Liked = mongoose.model('liked', likedSchema)

module.exports = { likedSchema, Liked}