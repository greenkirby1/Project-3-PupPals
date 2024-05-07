import mongoose from 'mongoose'
import 'dotenv/config'

import Pup from '../models/pup.js'
import pupData from '../database/data/pups.js'
import User from '../models/user.js'
import createdUsers from '../database/data/users.js'


async function seedData(){
    try {
        // establish connection
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('✅ database connection established')

        // remove users
        const deletedUsers = await User.deleteMany()
        console.log(`😵 ${deletedUsers.deletedCount} users deleted`)

        // remove pups
        const deletedPups = await Pup.deleteMany()
        console.log(`🐶 ${deletedPups.deletedCount} pups deleted`)

        // adds random user id to owner field in each pup
        const pupsWithOwners = pupData.map(pup => {
            const userId = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
            console.log(userId)
            return { ...pup, owner: userId }
        })

        // adds seed data into database
        const createdPups = await Pup.create(pupData)
        console.log(`🌱 ${createdPups.length} pups added.`)

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