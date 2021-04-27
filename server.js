import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser  from 'body-parser'
import createError from 'http-errors'
import cors from 'cors'

import connectDB from './config/db.js'
// desc: Routes import 
import userRoutes from './routes/userRoutes.js' 
import quizRoutes from './routes/scheduleQuizRoutes.js' 
import questionRoutes from './routes/questionRoutes.js' 
import ResultRoutes from './routes/quizResultRoutes.js' 
import FeedbackRoutes from './routes/feedbackRoutes.js' 
import contestRoutes from './routes/contestRoutes.js' 


dotenv.config()
connectDB()
const app = express()
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
// }
//  desc: passing routes as a middleware
app.use(userRoutes)
app.use(quizRoutes)
app.use(questionRoutes)
app.use(ResultRoutes)
app.use(FeedbackRoutes)
app.use(contestRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use( async(req, res, next) => {
  next(createError.NotFound("the route does not exist"));
});
  
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});
const port = parseInt(process.env.PORT) || 3000
app.listen(port, console.log(`server running on port ${port}`))