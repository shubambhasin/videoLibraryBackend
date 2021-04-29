const express = require('express');
const app = express();
const router = require('./routers/videosRouter.js')

app.get('/', (req, res) => {
  res.send('careTv API')
});
app.use('/videos', router)

app.listen(3000, () => {
  console.log('server started');
});