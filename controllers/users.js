import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { sendError, sendUnauthorized } from '../lib/common.js'


// * Register
// Method: POST
// Path: /api/register
// app.post('/api/users')
export const register = async (req, res) => {
  try {
    const registeredUser = await User.create(req.body)
    console.log(req.body)
    return res.json({ message: `Welcome, ${registeredUser.firstName}` })
  } catch (error){
    sendError(error, res)
  }
}

// * Login 
// Method: POST
// Path: /api/users/login
// app.post('/api/users/:userId')
export const login = async (req, res) => {
  try {
    // locate user based on email
    const foundUser = await User.findOne({ email: req.body.email })

    // if user not found, throw unauthorized
    if (!foundUser) {
      return sendUnauthorized(res)
    }

    // if user is found - check password, if password incorrect send 401
    if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      return sendUnauthorized(res)
    }

    // generate jwt 
    const token = jwt.sign({ sub: foundUser._id }, process.env.SECRET, {
      expiresIn: '7d'
    })

    // send token back in response
    return res.json({
      message: `Welcome back, ${foundUser.firstName}`,
      token: token
    })
  } catch (error){
    sendError(error, res)
  }
}

// * Profile Show (secureRoute)
// For: Displaying profile
// Method: GET
// Path: /api/profile
// app.get('/api/profile'
export const getProfile = async (req, res) => {
  try {
    const profile = await User.findById(req.currentUser._id).populate(
      'pupsCreated'
    )
    return res.json(profile)
  } catch (error) {
    sendError(error, res)
  }
}

// * Update Profile (secureRoute)
// For: updating user profile
// Method: PUT
// Path: /api/users/profile
// app.put('/api/profile' 
export const updateProfile = async (req, res) => {
  try {
    const profileToUpdate = await User.findById(req.currentUser._id)
    Object.assign(profileToUpdate, req.body)
    await profileToUpdate.save()
    return res.json(profileToUpdate)
  } catch (error) {
    sendError(error, res)
  }
}

// * Throwing Bones in Browse Pups Page (Liking Pup)
export const throwBones = async (req, res) => {
  try {
    const targetProfile = await User.findById() // <- put in user id
    Object.assign(BoneThrownAt, req.body)
    await targetProfile.save()
    return res.json(targetProfile)
  } catch (error) {
    sendError(error, res)
  }
}

// Getting all Users for testing purposes - DELETE ONCE USED
// export const getUsers = async (req, res) => {
//   try {
//     const user = await User.find()
//     res.json(user)
//   } catch (error) {
//     sendError(error, res)
//   }
// }
