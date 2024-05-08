import mongoose from 'mongoose'


const messageSchema = new mongoose.Schema({
	message: { type: String, required: true },
	pup: { type: mongoose.ObjectId, ref: 'Pup', required: true }
},
{ timestamps: { createdAt: true, updatedAt: false } }
)

const chatSchema = new mongoose.Schema({
	messages: [messageSchema],
	users: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		validate: {
			validator: function (arr) {
				return arr.length === 2
			},
			message: 'The users field must conatin 2 unique user IDs.'
		}
	},
	pups: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pup' }],
		validate: {
			validator: function (arr) {
				return arr.length === 2
			},
			message: 'The pups field must contain 2 unique pup IDs.'
		}
	}
},
{ timestamps: true }
)

export default mongoose.model('Chat', chatSchema)
