import ReactCardFlip from 'react-card-flip'
import { useState } from 'react'
import axios from 'axios'
import SingleChatBtn from './SingleChatBtn'
import { getToken } from '../../lib/auth'

export default function ChatCard({ userChat, userProfile, styles, getUserChat }) {

  const [flipChatCard, setFlipChatCard] = useState(false)
  const [currentChat, setCurrentChat] = useState()
  const [currentPup, setCurrentPup] = useState('')
  const [msg, setMsg] = useState({
    message: '',
    pup: ''
  })

  function findCurrentChat(chatId) {
    const matchedChat = userChat.find(chat => chat._id === chatId)
    setCurrentChat(matchedChat)
  }

  function findCurrentPup(pups) {
    const matchedPup = userProfile.pupsCreated.find(pup => {
      console.log(pup)
      pups.forEach(pupId => {
        if (pupId === pup._id) {
          setCurrentPup(pupId)
        }
      })
    })
    // console.log(matchedPup)
  }


  function handleChange(e) {
    setMsg({ ...msg, message: e.target.value, pup: currentPup })
  }

  async function handleSend(e) {
    e.preventDefault()
    const { data } = await axios.post(`/api/chats/${currentChat._id}`, msg, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    console.log(currentChat)
    setMsg({ ...msg, message: '', pup: '' })
    getUserChat()
  }

  async function deleteChat() {
    // console.log(currentChat, currentChat._id)
    const { data } = await axios.delete(`/api/chats/${currentChat._id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    setCurrentChat()
    setFlipChatCard(!flipChatCard)
    getUserChat()
  }

  return (
    <ReactCardFlip isFlipped={flipChatCard}>
      <div className='chat-front' style={styles.card}>
        {userChat.length ?
          userChat.map(({ _id, messages, users, pups, createdAt, updatedAt }) => (
            <SingleChatBtn
              key={_id}
              findCurrentChat={findCurrentChat}
              findCurrentPup={findCurrentPup}
              flipChatCard={flipChatCard}
              setFlipChatCard={setFlipChatCard}
              _id={_id}
              messages={messages}
              pups={pups}
              updatedAt={updatedAt}
              styles={styles}
              userChat={userChat}
            />
          ))
          :
          <h2 className='small-label'>&apos;Browse Pups&apos; to start matching...</h2>
        }
      </div>
      <div className='chat-back' style={styles.card}>
        {currentChat ?
          <div>
            <h2>Chat with Your Pup Pal</h2>
            {currentChat?.messages.length > 0 ?
              currentChat.messages.map(({ message, pup, createdAt }, idx) => {
                return (
                  <div className='message-container' key={idx}>
                    <div className='message'>
                      <img className='chat-icon' src={pup.image} alt={pup.image} />
                      {message}
                    </div>
                    <div className='message-timestamp'>Sent on {new Date(createdAt).toDateString()}</div>
                  </div>
                )

              })
              :
              <h2>Start chatting!</h2>
            }
            <form className='send-message' onSubmit={handleSend}>
              <label hidden htmlFor='msg'>Message</label>
              <input
                type='text'
                id='msg'
                name='msg'
                required
                minLength='1'
                maxLength='100'
                placeholder='Send a message...'
                value={msg.message}
                onChange={handleChange}
              />
              <button style={styles.flipBtn} type='submit'>Send</button>
            </form>
            <button 
              style={styles.flipBtn} 
              type='button'
              onClick={deleteChat}
            >
              Delete Chat
            </button>
          </div>
          :
          <h2>Cannot load chat</h2>
        }

        <button style={styles.flipBtn} onClick={() => setFlipChatCard(!flipChatCard)}>Back to All Chats</button>
      </div>
    </ReactCardFlip>
  )
}