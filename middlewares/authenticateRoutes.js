const jwt = require('jsonwebtoken')

const mySecret = process.env['authToken']
const secret = mySecret
const authenticateRoutes = (req, res, next) => {
  const token = req.headers.authorization
  if(token)
  {
    jwt.verify(token, secret, ( error, decodeToken) => {
      if(error)
      {
        console.log("Error from auth verify:", error)
        res.json({error: error})
      }
      else{
        console.log("User verified")
        next()
      }
    })
  } else {
    console.log("No auth token")
    res.json({error: "No auth token recieved"})
  }
}
module.exports = { authenticateRoutes }


