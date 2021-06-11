const mongoose = require('mongoose')
const { Schema } = mongoose;

const savedSchema = new Schema({
 
userId: {
    type: mongoose.SchemaTypes.ObjectId,    
    ref: "signup"},
  videos: [{
    type: Schema.Types.ObjectId,
    ref: "video"
  }]
}, { timestamps: true })

const Saved = mongoose.model('saved', savedSchema)

module.exports = { savedSchema, Saved}