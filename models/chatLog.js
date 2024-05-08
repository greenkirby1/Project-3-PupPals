import mongoose from 'mongoose'


const messageSchema = new mongoose.Schema({
	message: { type: String, required: true },
	pup: { type: mongoose.ObjectId, ref: 'Pup', required: true },
	pupIcon: { type: mongoose.ObjectId, ref: 'Pup', required: true }
},
{ timestamps: { createdAt: true, updatedAt: false } }
)

const chatSchema = new mongoose.Schema({
	chatLog: [messageSchema],
	betweenPups: [String]
},
	{ timestamps: true }
)

export default mongoose.model('Chat', chatSchema)
