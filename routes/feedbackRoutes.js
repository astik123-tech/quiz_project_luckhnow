import express from 'express';
const route  = express.Router()
import feedback from '../model/feedbackModel.js';

route.post('/postfeedback',async(req, res, next)=>{
    try {
        const newfeedback = new feedback({
            comment:req.body.comment,
            _id:req.body._id,
            userName:req.body.userName
        })
        await newfeedback.save()
        res.status(201).json("successful")
    } catch (error) {
        next(error)
    }
})

export default route