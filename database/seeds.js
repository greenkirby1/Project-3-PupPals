import mongoose from 'mongoose'
import 'dotenv/config'

import Pup from '../models/pup.js'
import pupData from '../database/data/pups.js'
import User from '../models/user.js'
import userData from '../database/data/users.js'
import Chat from '../models/chat.js'
import chatData from '../database/data/chats.js'


async function seedData() {
  try {
    // * establish connection
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('✅ database connection established')

    // * remove users
    const deletedUsers = await User.deleteMany()
    console.log(`😵 ${deletedUsers.deletedCount} users deleted`)

    // * create new users
    const createdUsers = await User.create(userData)
    console.log(`👤 ${createdUsers.length} users created`)

    // * remove pups
    const deletedPups = await Pup.deleteMany()
    console.log(`🐶 ${deletedPups.deletedCount} pups deleted`)

    // * remove chats
    const deletedChats = await Chat.deleteMany()
    console.log(`💬 ${deletedChats.deletedCount} chats deleted`)

    // * adds random user id to owner field in each pup
    const pupsWithOwners = pupData.map(pup => {
      const userId = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
      return { ...pup, owner: userId }
    })

    // * creat new pups
    // now pups exist containing id for later use
    const createdPups = await Pup.create(pupsWithOwners)
    console.log(`🌱 ${createdPups.length} pups added.`)

    // * adds random pup id to pups and users fields in each chat, pup id and pup image to the each message
    // map through chat data to access single chats
    const chatsBetweenPups = chatData.map(chat => {
      const pupIdArr = [] 
      const userIdArr = []
      // loop through twice to retrieve 2 random pup IDs
      for (let i = 0; i < 2; i++) { 
        const pupId = createdPups[Math.floor(Math.random() * createdPups.length)]._id
        let userId
        // going through every pup in created pups array 
        // and finding a match with randomly found pup id
        for (const pup of createdPups) {
          if (pupId.equals(pup._id)) {
            userId = pup.owner
            break
          }
        }
        // push found user id into user id array
        userIdArr.push(userId)
        // push random pup id into pup id array
        pupIdArr.push(pupId)
      }
      // console.log('owner here ->', ownerIdArr)
      // console.log('pup here ->', pupIdArr)

      // destructure chat 
      // variable name defined for a single chat when chat data was mapped through initially
      const { messages } = chat
      // console.log(messages)

      // map through the messages array within single chat 
      const messagesWithPupInfo = messages.map(msg => {
        // retreievs random id from the array of 2 pup ids
        const randomId = pupIdArr[Math.floor(Math.random() * pupIdArr.length)]
        let pupIcon
        // check for match in created pups to find the image for matched pup
        createdPups.forEach(pup => {
          if (randomId.equals(pup._id)) {
            pupIcon = pup.image
          }
        })
        // add random id and matched pup image to single message
        return { ...msg, pup: { _id: randomId, image: pupIcon } }
      })
      // add messages with info back into chat along with 2 pup ids and 2 user ids
      return { ...chat, messages: messagesWithPupInfo, pups: pupIdArr, users: userIdArr }
    })

    // * adds new chat
    const createdChats = await Chat.create(chatsBetweenPups)
    console.log(`🗣️ ${createdChats.length} chats added`)
    console.log(createdChats)

    // * close connection after completion
    await mongoose.connection.close()
    console.log('👍 successfully seeded data conncetion now closed')
  } catch (error) {
    console.log(error)

    // * close connection due to error
    await mongoose.connection.close()
    console.log('✂️ connection severed due to error')
  }
}

seedData()