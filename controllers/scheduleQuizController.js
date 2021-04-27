import ScheduleQuiz from "../model/scheduleQuizModel.js";
import asyncHandler from "express-async-handler";
import createError from 'http-errors'
const createQuiz = async (req, res, next) => {
  try {
    const {
      contentKey,
      author_Name,
      duration,
      number_of_questoin,
      contest_name,
      _userId,
    } = req.body;

    let current = new Date();
    let date = current.getDate();
    let hour = current.getHours() + parseInt(duration);
    if (hour > 24) {
      hour = hour - 24;
      date = date + 1;
    }
    const quiz = new ScheduleQuiz({
      contentKey,
      author_Name,
      duration,
      date: date,
      time: hour,
      number_of_questoin,
      contest_name,
      _userId,
    });
    const result = await quiz.save();
    result? res.status(201).json("Successfully created"): res.json("Failed..!!");
  
  } catch (error) {
     next(error)
  }
  };

const checkContestKey = asyncHandler(async (req, res) => {
  const { contestKey } = req.body;
  const result = await ScheduleQuiz.findOne({ contentKey: contestKey });

  result? res.status(201).json({ success: true, contest: result }): res.json({ success: false });
});

const getAllScheduledContestById = asyncHandler(async (req, res) => {
  const _userId = req.params._userId;
  let current = new Date();
  const date = parseInt(current.getDate());
  const time = parseInt(current.getHours());
  const result = await ScheduleQuiz.find(
    { "_userId": _userId, $or: [{"date": { $gte: date }}, {"time": { $gt: time }}] },
  );
  res.send(result);
});

export default { createQuiz, checkContestKey, getAllScheduledContestById };
