const mongoose = require('mongoose')
const { Schema } = mongoose;

const signupSchema = new Schema( {
  name: {
    type: String,
    required: [true,"Please enter a name"]
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: [isEmail, "Please enter an valid Email"]
  },
  password: {
      type: String,
       type: String,
    minlength: [6,"password should be atleast of 6 characters"]
  }

}, { timestamps: true})

const Signup = mongoose.model('signup', signupSchema)

module.exports = { signupSchema, Signup }