import mongoose from 'mongoose'
import 'dotenv/config'

import Pup from '../models/pup.js'
import pupData from '../database/data/pups.js'
import User from '../models/user.js'
import userData from '../database/data/users.js'
import Chat from '../models/chatLog.js'
import chatData from '../database/data/chatLogs.js'


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

		// remove pups
		const deletedPups = await Pup.deleteMany()
		console.log(`🐶 ${deletedPups.deletedCount} pups deleted`)

		const deletedChats = await Chat.deleteMany()
		console.log(`💬 ${deletedChats.deletedCount} chats deleted`)

		// adds random user id to owner field in each pup
		const pupsWithOwners = pupData.map(pup => {
			const userId = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
			return { ...pup, owner: userId }
		})

		// creating pup data now so pup id exists for later
		const createdPups = await Pup.create(pupsWithOwners)
		console.log(`🌱 ${createdPups.length} pups added.`)
		console.log(createdPups)

		// adds random pup id to betweenPups field in each chat and pup id to the messages
		const chatsBetweenPups = chatData.map(chat => {
			const pupIdArr = []
			for (let i = 0; i < 2; i++) {
				const pupId = createdPups[Math.floor(Math.random() * createdPups.length)]._id
				pupIdArr.push(pupId)
			}
			// console.log(pupIdArr)
			const { chatLog } = chat
			// console.log(chatLog)
			const messagesWithPupId = chatLog.map(msg => {
				const randomId = pupIdArr[Math.floor(Math.random() * pupIdArr.length)]
				// console.log(randomId)
				return { ...msg, pup: randomId }
			})
			return { ...chat, chatLog: messagesWithPupId, betweenPups: pupIdArr }
		})

		// adds chat seed data into database
		const createdChats = await Chat.create(chatsBetweenPups)
		console.log(`🗣️ ${createdChats.length} chats added`)
		console.log(createdChats)

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