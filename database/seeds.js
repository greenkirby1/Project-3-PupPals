import mongoose from 'mongoose'
import 'dotenv/config'

import Pup from '../models/pup.js'
import pupData from '../database/data/pups.js'
import User from '../models/user.js'
import createdUsers from '../database/data/users.js'
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

		// remove pups
		const deletedPups = await Pup.deleteMany()
		console.log(`🐶 ${deletedPups.deletedCount} pups deleted`)

		const deletedChats = await Chat.deleteMany()
		console.log(`💬 ${deletedChats.deletedCount} chats deleted`)

		// adds random user id to owner field in each pup
		const pupsWithOwners = pupData.map(pup => {
			const userId = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
			console.log(userId)
			return { ...pup, owner: userId }
		})

		// adds random pup id to betweenPups field in each chat and pup id to the messages
		const chatsBetweenPups = chatData.map(chat => {
			const pupId = pupData[Math.floor(Math.random() * pupData.length)]._id
			for (i = 0; i < 2; i++) {
				pupIdArr = []
				pupIdArr.push(pupId)
				const { chatLog: [messages] } = chat
				const pupMessage = messages.map(msg => {
					const randomId = pupIdArr[Math.floor(Math.random() * pupIdArr.length)]
					const pupIcon = pupData[randomId].image
					return { ...msg, pup: randomId, pupIcon: pupIcon }
				})
				return { ...chat, betweenPups: pupIdArr }
			}
		})

		// adds seed data into database
		const createdPups = await Pup.create(pupData)
		console.log(`🌱 ${createdPups.length} pups added.`)

		const createdChats = await Chat.create(chatData)
		console.log(`🗣️ ${createdChats.length} chats added`)

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