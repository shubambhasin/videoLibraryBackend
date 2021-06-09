const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routers/videosRouter.js')
const connectDatabase = require("./DB/db.connect.js")
const historyRouter = require('./routers/historyRouter')
const savedRouter = require('./routers/savedRouter')
const likedRouter = require('./routers/likedRouter')
const unlikedRouter = require('./routers/unlikedRouter')
const signupRouter = require('./routers/signupRouter')
const signinRouter = require('./routers/signinRouter')
const { History } = require('./models/historyModel.js')
const { authenticateRoutes } = require('./middlewares/authenticateRoutes')
app.use(cors())
app.use(express.json());
connectDatabase()
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


app.get('/', (req, res) => {
  res.send('careTv API')
});

app.get('/check', async (req, res) => {


  const data = await History.find()

  res.send(data)

})
app.use('/videos', router)
app.use('/history',historyRouter)
app.use('/saved',  savedRouter)
app.use('/liked', likedRouter)
app.use('/unliked', unlikedRouter)
app.use('/signup', signupRouter)
app.use('/login', signinRouter)


app.listen(3000, () => {
  console.log('server started');
});