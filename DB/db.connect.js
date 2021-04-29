const mongoose = require('mongoose')


const databaseUrl = process.env['databaseUrl']


const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true, //this is the code I added that solved it all
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  useFindAndModify: false,
  useUnifiedTopology: true
}

const connectDatabase = async () => {

  try {
    await mongoose.connect(databaseUrl, options)
    console.log("Connect to db successfully")
  } catch(err)
  {
    console.log("connection failed, error:", err )
  }

}

module.exports = connectDatabase