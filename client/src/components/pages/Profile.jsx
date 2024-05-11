import { useState, useEffect, useCallback } from "react"
import axios from 'axios'
import { getToken } from "../../lib/auth"
import ReactCardFlip from 'react-card-flip'
import Form from "../subcomponents/Form"
import PupCard from '../elements/PupCard'
import UserCard from "../elements/UserCard"



export default function Profile() {

  // * States
  const [userProfile, setUserProfile] = useState()
  const [userChat, setUserChat] = useState()
  const [profileError, setProfileError] = useState('')
  const [chatError, setChatError] = useState('')
  const [flipChatCard, setFlipChatCard] = useState(false)
  const [currentChat, setCurrentChat] = useState()
  const [msg, setMsg] = useState('')

  // * API Calls
  async function getUserProfile() {
    try {
      const { data } = await axios.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      setUserProfile(data)
      // console.log(data)
    } catch (error) {
      setProfileError(error.message)
    }
  }

  async function getUserChat() {
    try {
      const { data } = await axios.get('/api/chats', {
        headers: {

          Authorization: `Bearer ${getToken()}`
        }
      })
      setUserChat(data)
      // console.log(data)
    } catch (error) {
      setChatError(error.message)
    }
  }

  useEffect(() => {
    getUserProfile()
    getUserChat()
  }, [])

  function findCurrentChat(chatId) {
    console.log(chatId)
    const matchedChat = userChat.find(chat => chat._id === chatId)
    setCurrentChat(matchedChat)
  }
  

  function handleChange(e) {
    setMsg(e.target.value)
  }

  async function handleSend(e) {
    e.preventDefault()
    const { data } = await axios.post(`/api/chats/${currentChat._id}`, msg, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    console.log('sent to', currentChat._id)
  }

  return (
    <div>
      {userProfile && userChat ?
        <div className='container' style={{ height: '100vh', width: '100vh' }}>
          <div className='card-wrapper'>
            <UserCard userProfile={userProfile} />
            <div className='pup-card-wrapper'>
              {userProfile.pupsCreated.length ?
                userProfile.pupsCreated.map(({ _id, pupName, image, gender, birthday, breed, bio, dislikes, favorites, neutered, owner }) => (
                  <PupCard
                    key={_id}
                    _id={_id}
                    pupName={pupName}
                    image={image}
                    gender={gender}
                    birthday={birthday}
                    breed={breed}
                    bio={bio}
                    dislikes={dislikes}
                    favorites={favorites}
                    neutered={neutered}
                    owner={owner}
                  />
                ))
                :
                <h2>add pups...</h2>
              }
            </div>
            <ReactCardFlip isFlipped={flipChatCard}>
              <div className='all-chats'>
                {userChat.length ?
                  userChat.map(({ _id, messages, users, pups, createdAt, updatedAt }) => (
                    <button
                      key={_id}
                      onClick={() => {
                        setFlipChatCard(!flipChatCard)
                        findCurrentChat(_id)
                      }}
                    >
                      {messages[messages.length - 1].message}
                      <br />
                      Sent at {updatedAt}
                    </button>
                  ))
                  :
                  <h2>You do not have any matches yet...</h2>
                }
              </div>
              <div className='single-chat'>
                {currentChat ?
                  // console.log(currentChat)
                  <div>
                    {currentChat.messages.length > 0 ?
                      currentChat.messages.map(({ message, pup: { _id, image }, createdAt }, idx) => (
                        <div key={idx}>
                          <img src={image} alt={message} />
                          {message}
                          <br />
                          Sent at {createdAt}
                        </div>
                      ))
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
                        value={msg}
                        onChange={handleChange}
                      />
                      <button type='submit'>Send</button>
                    </form>
                  </div>
                  :
                  <h2>Cannot load chat</h2>
                }

                <button onClick={() => setFlipChatCard(!flipChatCard)}>Back to All Chats</button>
              </div>
            </ReactCardFlip>
          </div>
        </div>
        :
        profileError || chatError ?
          <p className='text-danger'>{profileError || chatError}</p>
          :
          <h2>Loading...</h2>
      }
    </div>
  )
}