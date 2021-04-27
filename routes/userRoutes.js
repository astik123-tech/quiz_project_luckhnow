import express from 'express'
const route  = express.Router()
import User  from '../controllers/userController.js'

route.post('/user/login', User.loginUser)
route.post('/user/createAccount', User.createUser)
route.get('/user/getUserProfile/:id', User.getUserProfile)
route.put('/user/updateUserProfile', User.updateUserProfile)

export default route