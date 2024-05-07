import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
// import router from './lib/router.js'
import Pup from './models/pup.js'
import User from './models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
app.get('/api/pups', async (req, res) => {
  try {
    const pups = await Pup.find()
    res.json(pups)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' })
  }
});
// * Pup by owner (secureRoute)
// For: Profile 
// Method: GET
// Path: /api/users/:userId/pups
app.get('/api/users/:userId/pups', async (req, res) => {
  try {
    const { userId } = req.params;
    const pups = await Pup.find({ owner: userId })
    res.json(pups)
  } catch (error) {
    console.log('Error retrieving pups:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// * Pup Create (secureRoute)
// For: creating user pup
// Method: POST
// Path: /api/users/:userId/pups
app.post('/api/users/:userId/pups', async (req, res) => {
  try {

    const { userId } = req.params
    const pupData = await Pup.create(req.body)
    pupData.owner = userId
    
    return res.status(201).json(pupData)
  } catch (error) {
    console.log(error)
  }
});
// * Pup Update (secureRoute)
// For: updating the users pup's details
// Method: PUT
// Path: /api/users/:userId/pups/:pupId
app.put('/api/users/:userId/pups/:pupId', async (req, res) => {
  try {
    const { userId, pupId } = req.params;
    const updatedPupData = req.body;

    const pup = await Pup.findOneAndUpdate(
      { _id: pupId, owner: userId },
      updatedPupData,
      { new: true }
    );

    if (!pup) {
      return res.status(404).json({ error: 'Pup not found' })
    }

    res.json(pup)
  } catch (error) {
    console.log(error)
  }
});
// * Pup Delete (secureRoute)
// For: deleting current pup
// Method: DELETE
// Path: /api/users/:userId/pups/:pupId
app.delete('/api/users/:userId/pups/:pupId', async (req, res) => {
  try {
    const { userId, pupId } = req.params

    const pup = await Pup.findOneAndDelete({ _id: pupId, owner: userId })

    if (!pup) {
      return res.status(404).json({ error: 'Pup not found' })
    }

    res.sendStatus(204)
  } catch (error) {
    console.log(error)
  }
});


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
// app.post('/api/users/:userId')
app.post('/api/users/:userId', async (req, res) => {
  try {
    // locate user based on email
    const foundUser = await User.findOne({ email: req.body.email })

    // if user not found, throw unauthorized
    if (!foundUser) {
      return (res, '401 unauthorized!, user not found')
    }

    // if user is found - check password, if password incorrect send 401
    if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      return (res, '401 unauthorized!, incorrect password')
    }

    // generate jwt 
    const token = jwt.sign({ sub: foundUser._id }, process.env.SECRET, {
      expiresIn: '24h'
    })

    // send token back in response
    return res.json({
      message: `Welcome back, ${foundUser.firstName}`,
      token: token
    })
  } catch (error) {
    console.log(error)
  }
})

// * Register
// Method: POST
// Path: /api/users
app.post('/api/users', async (req, res) => {
  try {
    const registeredUser = await User.create(req.body)
    console.log(req.body)
    return res.json({ message: `Welcome, ${registeredUser.firstName}` })
  } catch (error) {
    console.log(error)
  }
})

// * Profile (secureRoute)
// For: Displaying profile
// Method: GET
// Path: /api/users/:userId
app.get('/api/users/:userId', (req, res) => {
  try {
    console.log('hit profile route')
  } catch (error) {
    console.log(error)
  }
})

// * Update Profile (secureRoute)
// For: updating user profile
// Method: PUT
// Path: /api/users/:userId
app.put('/api/users/:userId', (req, res) => {
  try {
    console.log('hit update profile route')
  } catch (error) {
    console.log(error)
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