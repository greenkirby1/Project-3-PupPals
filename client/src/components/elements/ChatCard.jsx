import ReactCardFlip from 'react-card-flip'
import { useState } from 'react'
import axios from 'axios'
import SingleChatBtn from './SingleChatBtn'
import { getToken } from '../../lib/auth'

export default function ChatCard({ userChat }) {

  const [flipChatCard, setFlipChatCard] = useState(false)
  const [currentChat, setCurrentChat] = useState()
  const [msg, setMsg] = useState('')

  function findCurrentChat(chatId) {
    // console.log(chatId)
    const matchedChat = userChat.find(chat => chat._id === chatId)
    setCurrentChat(matchedChat)
  }

  function handleChange(e) {
    setMsg(e.target.value)
  }

  async function handleSend(msg) {
    const { data } = await axios.post(`/api/chat/${currentChat}`, msg, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  }

  return (
    <ReactCardFlip isFlipped={flipChatCard}>
      <div className='all-chats'>
        {userChat.length ?
          userChat.map(({ _id, messages, users, pups, createdAt, updatedAt }) => (
            <SingleChatBtn
              key={_id}
              _id={_id}
              messages={messages}
              updatedAt={updatedAt}
              flipChatCard={flipChatCard}
              setFlipChatCard={setFlipChatCard}
              findCurrentChat={findCurrentChat}
            />
          ))
          :
          <h2>You do not have any matches yet...</h2>
        }
      </div>
      <div className='single-chat'>
        {currentChat ?
          <div>
            {currentChat.messages.length > 0 ?
              currentChat.messages.map(({ message, pup: { _id, image }, createdAt }, idx) => (
                <div key={idx}>
                  <img src={image} alt={_id} />
                  {message}
                  <br />
                  Sent at {createdAt}
                </div>
              ))
              :
              <h2>Start chatting!</h2>
            }
            <label hidden htmlFor='msg'>Message</label>
            <input
              type='text'
              id='msg'
              name='msg'
              required
              minLength='1'
              maxLength='100'
              placeholder='Send a message...'
              value={msg}
              onChange={handleChange}
            />
            <button type='submit'>Send</button>
          </div>
          :
          <h2>Cannot load chat</h2>
        }
        <input type="submit" />
        <button onClick={() => 
          setFlipChatCard(!flipChatCard)}>Back to All Chats</button>
      </div>
    </ReactCardFlip>
  )
}