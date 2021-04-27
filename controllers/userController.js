import User from "../model/userModel.js";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import { signAccessToken } from "../middleware/token.js";
import bcrypt from "bcrypt";
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw createError.BadRequest();
    const doesExist = await User.findOne({ email: email });
    if (doesExist) throw createError.Conflict(`${email} already exist...`);
    const newUser = new User({
      name,
      email,
      password,
    });
    const response = await newUser.save();
    const token = await signAccessToken(response._id);

    if (response)
      res.send({
        success: true,
        _id: response._id,
        name: response.name,
        email: response.email,
        token: token,
      });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw createError.BadRequest();
    const doesExist = await User.findOne({ email: email });
    if (!doesExist) {
      throw createError.Unauthorized("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, doesExist.password);
    if (!isMatch) {
      throw createError.Unauthorized("Invalid email or password");
    } else {
      const token = await signAccessToken(doesExist._id);

      res.send({
        success: true,
        _id: doesExist._id,
        name: doesExist.name,
        email: doesExist.email,
        token: token,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      res.send({ _id: user._id, name: user.name, email: user.email });
    } else {
      throw new Error("Not found");
    }
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.body.id });
    const body = req.body;
    user.email = body.email || user.email;
    user.name = body.name || user.name;
    user.password = body.password || user.password;
    const result = await user.save();
    if (result) {
      res.send({ _id: user._id, name: user.name, email: user.email });
    }
  } catch (error) {
    next(error);
  }
};

export default { createUser, loginUser, getUserProfile, updateUserProfile };
