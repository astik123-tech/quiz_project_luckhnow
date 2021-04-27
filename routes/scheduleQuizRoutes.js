
import express from 'express'
const route  = express.Router()
import Quiz  from '../controllers/scheduleQuizController.js'

route.post('/createQuiz', Quiz.createQuiz)
route.post('/checkContestKey', Quiz.checkContestKey)
route.get('/getScheduledContest/:_userId', Quiz.getAllScheduledContestById)


export default route