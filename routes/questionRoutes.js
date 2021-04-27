import express from 'express'
const route  = express.Router()
import Question  from '../controllers/questionController.js'

route.post('/insertQuestion', Question.insertQuestion)
route.post('/getQuestion', Question.getQuestion)
route.post('/verifyAnswer', Question.verifyAnswer)


export default route