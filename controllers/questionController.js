import Question from '../model/questionModel.js'
import asyncHandler from 'express-async-handler'
import ScheduleQuiz from '../model/scheduleQuizModel.js'

const insertQuestion = asyncHandler(async(req, res)=>{
    const {question,optionOne, optionTwo, optionThree, optionFour,CorrectAnswer} = req.body;
    const NewQuestion = new Question ({
        question,optionOne, optionTwo, optionThree, optionFour,CorrectAnswer
    })
    const result = await NewQuestion.save()
    result ? res.status(201).json("Successful") :res.json("Failed..!!");
    
})

const getQuestion = asyncHandler(async(req, res)=>{
   const key = await ScheduleQuiz.findOne({contentKey:req.body.contestKey})
   const questions = await Question.find({},{createdAt:0,updatedAt:0}).limit(parseInt(key.number_of_questoin));
   res.send({
       questions:questions,
       NoQ:parseInt(key.number_of_questoin),
       time:parseInt(key.duration)
   })
})
const verifyAnswer= asyncHandler(async(req, res)=>{
   
 })
export default { insertQuestion, getQuestion,verifyAnswer }