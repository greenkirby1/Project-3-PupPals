import { Router } from 'express'
import { pupIndex, 
  pupCreate, 
  pupOwned, 
  pupUpdate, 
  pupDelete 
} from '../controllers/pups.js'
import { 
  register, 
  login, 
  getProfile, 
  updateProfile,
  getUsers
} from '../controllers/users.js'
import {
  chatIndex,
  chatSingle,
  sendMessage
} from '../controllers/chats.js'
import User from '../models/user.js'
import secureRoute from './secureRoute.js'

const router = Router()

// Pup routes
router.route('/pups')
  .get(secureRoute, pupIndex)
  .post(secureRoute, pupCreate)

router.route('/pups/:pupId')
  .get(secureRoute, pupOwned)
  .put(secureRoute, pupUpdate)
  .delete(secureRoute, pupDelete)

// user routes
router.route('/users')
  .get(getUsers) 

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/profile')
  .get(secureRoute, getProfile)
  .put(secureRoute, updateProfile)

router.route('/chats').get(secureRoute, chatIndex)

router.route('/chats/:chatId')
  .get(secureRoute, chatSingle)
  .post(secureRoute, sendMessage)

export default router