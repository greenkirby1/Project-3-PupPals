import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
// import router from './lib/router.js'

const app = express()

const { PORT, CONNECTION_STRING } = process.env

// * Generic Middleware
app.use(express.json())
app.use(morgan('dev'))

// * Routes
// app.use('/api', router)

// * Pups Index 
// For: Matches
// Method: GET
// Path: /api/pups
app.get('/api/pups', (req, res) => {
  try {
    console.log('this is the pups route')
  } catch (error) {
    console.log(error)
  }
})

// * Pup by owner (secureRoute)
// For: Profile 
// Method: GET
// Path: /api/users/:userId/pups

// * Pup Create (secureRoute)
// For: creating user pup
// Method: POST
// Path: /api/users/:userId/pups

// * Pup Update (secureRoute)
// For: updating the users pup's details
// Method: PUT
// Path: /api/users/:userId/pups/:pupId

// * Pup Delete (secureRoute)
// For: deleting current pup
// Method: DELETE
// Path: /api/users/:userId/pups/:pupId

// * All Chat view (secureRoute)
// For: displaying All users chats
// Method: GET
// Path: /api/users/:userId/chats

// * Chat input (secureRoute)
// For: Sending a message
// Method: POST
// Path: /api/users/:userId/chats/:chatId

// * Single Chat view (secureRoute)
// For: display single chat
// Method: GET
// Path: /api/users/:userId/chats/:chatId

// * Login 
// Method: POST
// Path: /api/users/:userId

// * Register
// Method: POST
// Path: /api/users

// * Profile (secureRoute)
// For: Displaying profile
// Method: GET
// Path: /api/users/:userId

// * Update Profile (secureRoute)
// For: updating user profile
// Method: PUT
// Path: /api/users/:userId

// * Server Startup
async function startServers(){
  try {
    await mongoose.connect(CONNECTION_STRING)
    console.log('✅ Database connection established')
    
    app.listen(PORT, () => console.log(`🚀 Server up and running on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

startServers()