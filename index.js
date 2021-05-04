const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routers/videosRouter.js')
const connectDatabase = require("./DB/db.connect.js")
const historyRouter = require('./routers/historyRouter')

app.use(cors())
app.use(express.json());
connectDatabase()
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


app.get('/', (req, res) => {
  res.send('careTv API')
});
app.use('/videos', router)
app.use('/history', historyRouter)

app.listen(3000, () => {
  console.log('server started');
});