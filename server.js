import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
// import router from './lib/router.js'
import router from './lib/router.js'

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

const { PORT, CONNECTION_STRING } = process.env

// * Generic Middleware
app.use(express.json())
app.use(morgan('dev'))

// * Routes
app.use('/api', router)

app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
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