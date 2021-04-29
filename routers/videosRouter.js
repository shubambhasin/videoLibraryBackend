const express = require("express")
const router = express.Router()

router.route('/')
.get((req, res) => {
  res.send("Videos showm here")
})
.post((req, res) => {
  res.send(req.body)
})

module.exports = router;