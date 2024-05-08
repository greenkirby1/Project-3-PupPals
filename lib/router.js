import { Router } from 'express'
import { 
  register, 
  login, 
  getProfile, 
  updateProfile 
} from '../controllers/users.js'
import {
  chatIndex,
  chatSingle,
  sendMessage
} from '../controllers/chats.js'
import User from '../models/user.js'
import secureRoute from './secureRoute.js'

const router = Router()

// routers for pup data and chat data here
router.route('/users')
  .get( async (req, res) => {
    try {
      const user = await User.find()
      res.json(user)
    } catch (error) {
      console.log(error)
    }
  })

// user routes
router.route('/register').post(register)

router.route('/login').post(login)

router.route('/profile')
  .get(secureRoute, getProfile)
  .put(updateProfile)

router.route('/chats').get(secureRoute, chatIndex)

router.route('/chats/:chatId')
  .get(secureRoute, chatSingle)
  .post(secureRoute, sendMessage)

export default router