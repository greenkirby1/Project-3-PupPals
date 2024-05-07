import mongoose from 'mongoose'
import 'dotenv/config'

import Pup from '../models/pup.js'
import pupData from '../database/data/pups.js'
import User from '../models/user.js'
import userData from '../database/data/users.js'


async function seedData() {
  try {
    // establish connection
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('✅ database connection established')

    // remove users
    const deletedUsers = await User.deleteMany()
    console.log(`😵 ${deletedUsers.deletedCount} users deleted`)

    // add new users
    const createdUsers = await User.create(userData)
    console.log(`👤 ${createdUsers.length} users created`)
    console.log(createdUsers)

    // remove pups
    const deletedPups = await Pup.deleteMany()
    console.log(`🐶 ${deletedPups.deletedCount} pups deleted`)

    // adds random user id to owner field in each pup
    const pupsWithOwners = pupData.map(pup => {
      const userId = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
      return { ...pup, owner: userId }
    })

    // adds seed data into database
    const createdPups = await Pup.create(pupsWithOwners)
    console.log(`🌱 ${createdPups.length} pups added.`)
    console.log(createdPups)

    // close connection after completion
    await mongoose.connection.close()
    console.log('👍 successfully seeded data conncetion now closed')
  } catch (error) {
    console.log(error)

    // close connection due to error
    await mongoose.connection.close()
    console.log('✂️ connection severed due to error')
  }
}

seedData()