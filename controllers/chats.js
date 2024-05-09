import Chat from '../models/chat.js'
import Pup from '../models/pup.js'
import { sendError } from '../lib/common.js'

// * All Chat view (secureRoute)
// For: displaying All users chats
// Method: GET
// Path: /api/chats
export const chatIndex = async (req, res) => {
  try {
    console.log('showing all chats for this user')
    const allChats = await Chat.find({ users: req.currentUser._id })
    if (!allChats) {
      return res.status(404).json({ message: 'Start chatting with your matches!' })
    }
    return res.json(allChats)
  } catch (error) {
    sendError(error, res)
  }
}

// * Single Chat view (secureRoute)
// For: display single chat
// Method: GET
// Path: /api/chats/:chatId
export const chatSingle = async (req, res) => {
  try {
    console.log('showing single chat for user')
    const { chatId } = req.params
    console.log(chatId)
    const foundChat = await Chat.findById(chatId).populate('messages.pup', 'image')
    if (!foundChat) {
      return res.status(404).json({ message: 'Sorry! Chat not found.' })
    }
    return res.json(foundChat)
  } catch (error) {
    sendError(error, res)
  }
}

// * Chat input (secureRoute)
// For: Sending a message
// Method: POST
// Path: /api/chats/:chatId
export const sendMessage = async (req, res) => {
  try {
    console.log('📩 user is sending a message')
    const { chatId } = req.params
    const foundChat = await Chat.findById(chatId)
    if (!foundChat) {
      return res.status(404).json({ message: 'Sorry! Chat not found.' })
    }

    foundChat.messages.push(req.body)

    await foundChat.save()
    
    return res.json(foundChat)
  } catch (error) {
    sendError(error, res)
  }
}
