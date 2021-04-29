const express = require("express")
const router = express.Router()

router.route('/')
.get((req, res) => {
  res.send("Videos showm here")
})
.post((req, res) => {
  res.json(req.body)
})

module.exports = router;