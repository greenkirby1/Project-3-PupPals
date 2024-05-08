import Chat from '../models/chat.js'


// * All Chat view (secureRoute)
// For: displaying All users chats
// Method: GET
// Path: /api/chats
export const chatIndex = async (req, res) => {
  try {
    console.log('showing all chats for this user')
    req.body._id = req.currentUser._id
    const foundChats = await Chat.find({ users: req.currentUser._id })
    if (!foundChats)
  } catch (error) {
    console.log(error)
  }
}

// * Chat input (secureRoute)
// For: Sending a message
// Method: POST
// Path: /api/chats/:chatId
app.post('/api/users/:userId/chats/:chatId', (req, res) => {
  try {
    console.log('sending a message by specific user')
  } catch (error) {
    console.log(error)
  }
})

// * Single Chat view (secureRoute)
// For: display single chat
// Method: GET
// Path: /api/users/:userId/chats/:chatId
app.get('/api/users/:userId/chats/:chatId', (req, res) => {
  try {
    console.log('showing single chat log')
  } catch (error) {
    console.log(error)
  }
})