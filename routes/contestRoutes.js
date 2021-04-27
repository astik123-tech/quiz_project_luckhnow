import express from 'express';
const route  = express.Router()
import contest from '../model/contest.Model.js';

route.post('/postcontest',async(req, res, next)=>{
    try {
        const newcontest = new contest({
            contestkey:req.body.contestkey,
            contestName:req.body.contestName
        })
        await newcontest.save()
        res.status(201).json("successful")
    } catch (error) {
        next(error)
    }
})


route.get('/getcontest',async(req, res, next)=>{
    try {
        const result = await contest.find({})
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
})
export default route