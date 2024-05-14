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
    const allChats = await Chat.find({ users: req.currentUser._id }).populate('messages.pup', 'image')
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

// * Create Chat Match
export const createMatch = async (req, res) => {
  try {
    console.log('❤️ creating chat with match')
    const newChat = await Chat.create(req.body)
    return res.status(201).json(newChat)
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

// * Delete Chat/Match (secure route)
export const deleteMatch = async (req, res) => {
  try {
    console.log('💔 match is being removed')
    const { chatId } = req.params
    const deleteChat = await Chat.findOneAndDelete({ _id: chatId })

    console.log(deleteChat)
    
    if (!deleteChat) {
      throw new Error.DocumentNotFoundError('Chat Not Found')
    }

    const matchedUser = deleteChat.users.map(user => {
      if (!user.equals(req.currentUser._id)) {
        throw new sendUnauthorized()
      } 
    })

    await deleteChat.deleteOne()

    res.sendStatus(204)
  } catch (error) {
    sendError(error, res)
  }
}