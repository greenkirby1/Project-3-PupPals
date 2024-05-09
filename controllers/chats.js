import Chat from '../models/chat.js'
import Pup from '../models/pup.js'


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
    console.log(error)
  }
}

// * Single Chat view (secureRoute)
// For: display single chat
// Method: GET
// Path: /api/chats/:chatId
export const chatSingle = async (req, res) => {
  try {
    console.log('showing single chat log')
    const { chatId } = req.params
    console.log(chatId)
    const foundChat = await Chat.findById(chatId)
    if (!foundChat) {
      return res.status(404).json({ message: 'Sorry! Chat not found.' })
    }
    return res.json(foundChat)
  } catch (error) {
    console.log(error)
  }
}

// * Chat input (secureRoute)
// For: Sending a message
// Method: POST
// Path: /api/chats/:chatId
export const sendMessage = async (req, res) => {
  try {
    console.log('sending a message by specific user')
    const { chatId } = req.params
    const foundChat = await Chat.findById(chatId)

    if (!foundChat) {
      return res.status(404).json({ message: 'Sorry! Chat not found.' })
    }

    const { pups } = foundChat
    
    const foundPups = await Pup.find({ '_id': { $in: pups } })
    console.log(foundPups)

    let image
    
    const matchPupWithUser = foundPups.map(pup => {
      const isEqual = pup.owner.equals(req.currentUser._id)
      console.log(isEqual)
      if (isEqual) {
        req.body.pup = pup._id
        image = pup.image
      }
    })

    foundChat.messages.push({ ...req.body, pupIcon: image })

    await foundChat.save()
    
    return res.json(foundChat)

  } catch (error) {
    console.log(error.message)
  }
}
