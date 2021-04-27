import Question from '../model/questionModel.js'
import asyncHandler from 'express-async-handler'
import quizResult from '../model/quizResultModel.js'

const postResult = asyncHandler(async(req, res)=>{
 const check = await  quizResult.findOne({ userid:req.body.userid,contestKey:req.body.contestKey});
 if(check){
     check.totalMarks = req.body.totalMarks
     check.questions = req.body.questions
     await check.save()
 }else{
    const newBody =  new quizResult(
        {
            user:req.body.user,
            userid:req.body.userid,
            contestKey:req.body.contestKey,
            totalMarks:req.body.totalMarks,
            questions:req.body.questions
        })
       await newBody.save();
 }
    res.status(201).json("Successful")
 })
 
const getResultofUser = asyncHandler(async(req, res)=>{
   
})

const getRanking = asyncHandler(async(req, res)=>{
   const constestKey = req.params.contestKey;
   const result = await quizResult.find({contestKey:constestKey},{questions:0}).sort({totalMarks:-1})
   res.send(result)
})


export default { postResult, getResultofUser,getRanking }