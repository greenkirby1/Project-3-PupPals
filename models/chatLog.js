import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
	chatLog: [messageSchema],
	owners: [String]
})

const messageSchema = new mongoose.Schema({
	message: { type: String, required: true },
	owner: { type: mongoose.ObjectId, ref: 'User', required: true },
	pupIcon: { type: mongoose.ObjectId, ref: 'Pup', required: true }
},
	{ timestamps: true }
)

export default mongoose.model('Chat', chatSchema)
