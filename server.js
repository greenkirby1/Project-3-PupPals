import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
// import router from './lib/router.js'
import router from './lib/router.js'
import {Error} from 'mongoose'
import { sendError, sendUnauthorized } from './lib/common.js'


const app = express()

const { PORT, CONNECTION_STRING } = process.env

// * Generic Middleware
app.use(express.json())
app.use(morgan('dev'))

// * Routes
app.use('/api', router)

// * All Chat view (secureRoute)
// For: displaying All users chats
// Method: GET
// Path: /api/users/:userId/chats
app.get('/api/users/:userId/chats', (req, res) => {
  try {
    console.log('showing all chats for this user')
  }
    catch (error){
      sendError(error, res)
    }
})

// * Chat input (secureRoute)
// For: Sending a message
// Method: POST
// Path: /api/users/:userId/chats/:chatId
app.post('/api/users/:userId/chats/:chatId', (req, res) => {
  try {
    console.log('sending a message by specific user')
  } catch (error) {
    sendError(error, res)
  }
})

// * Single Chat view (secureRoute)
// For: display single chat
// Method: GET
// Path: /api/users/:userId/chats/:chatId
app.get('/api/users/:userId/chats/:chatId', (req, res) => {
  try {
    console.log('showing single chat log')
  } catch (error) {
    console.log(error)
    sendError(error, res)
  }
})

// * Server Startup
async function startServers() {
  try {
    await mongoose.connect(CONNECTION_STRING)
    console.log('✅ Database connection established')

    app.listen(PORT, () => console.log(`🚀 Server up and running on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

startServers()