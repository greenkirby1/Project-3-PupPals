import { Router } from 'express'
import { pupIndex,
  newPups,
  pupCreate, 
  pupOwned, 
  pupUpdate, 
  // pupDelete 
} from '../controllers/pups.js'
import { 
  register, 
  login, 
  getProfile, 
  updateProfile,
  throwBones
  // getUsers
} from '../controllers/users.js'
import {
  chatIndex,
  chatSingle,
  createMatch,
  sendMessage,
  deleteMatch
} from '../controllers/chats.js'
import secureRoute from './secureRoute.js'

const router = Router()

// Pup routes
router.route('/pups')
  .get(pupIndex)
  .post(secureRoute, pupCreate)

router.route('/new-pups')
  .get(secureRoute, newPups)

router.route('/pups/:pupId')
  .get(secureRoute, pupOwned)
  .put(secureRoute, pupUpdate)
  // .delete(secureRoute, pupDelete)


// user routes
// router.route('/users')
//   .get(getUsers) 

router.route('/users/:userId')
  .put(secureRoute, throwBones)

router.route('/register')
  .post(register)

router.route('/login')
  .post(login)

router.route('/profile')
  .get(secureRoute, getProfile)
  .put(secureRoute, updateProfile)

router.route('/chats')
  .get(secureRoute, chatIndex)
  .post(secureRoute, createMatch)

router.route('/chats/:chatId')
  .get(secureRoute, chatSingle) // do we need this?
  .post(secureRoute, sendMessage)
  .delete(secureRoute, deleteMatch)

export default router