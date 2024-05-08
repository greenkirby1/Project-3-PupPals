import jwt from 'jsonwebtoken'
import 'dotenv/config'
import User from '../models/user.js'

export default async (req, res, next) => {
  try {
    // check authorization header exists, if not throw error
    if (!req.headers.authorization) throw new Error()
    // remove 'bearer'
    const token = req.headers.authorization.replace('Bearer ', '')
    // run through verify jwt
    const payload = jwt.verify(token, process.env.SECRET)
    // if valid token, the above verify method will return the payload; ensure the token still exists.
    const foundUser = await User.findById(payload.sub)
    console.log(payload.sub)
    // if the user doesnt exist, send a 401
    if (!foundUser) throw new Error()
    // if the user does exist add userId to the req object
    req.currentUser = foundUser
    // pass req to next middleware function
    next()
  } catch (error) {
    console.log(error)
  }
}