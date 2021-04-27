
import express from 'express'
const route  = express.Router()
import Result  from '../controllers/quizResultController.js'

route.put('/postResult/:_id/contestkey/:key', Result.postResult)
route.get('/getRanking/:contestKey',Result.getRanking)

export default route