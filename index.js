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
app.use('/videos',authenticateRoutes, router)
app.use('/history', authenticateRoutes, historyRouter)
app.use('/saved', authenticateRoutes , savedRouter)
app.use('/liked', authenticateRoutes, likedRouter)
app.use('/unliked', authenticateRoutes, unlikedRouter)
app.use('/signup', signupRouter)
app.use('/signin', signinRouter)

app.listen(3000, () => {
  console.log('server started');
});