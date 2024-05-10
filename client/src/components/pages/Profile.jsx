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

  // * API Calls
  async function getUserProfile() {
    try {
      const { data } = await axios.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
      setUserProfile(data)
      console.log(data)
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
      console.log(data)
    } catch (error) {
      setChatError(error.message)
    }
  }

  useEffect(() => {
    getUserProfile()
    getUserChat()
  }, [])

  console.log(userChat)

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
                  userChat.map(({ _id, createdAt, messages }) => (
                    <></>
                  ))
                  :
                  <h2>You do not have any matches yet...</h2>
                }
                <button onClick={() => setFlipChatCard(!flipChatCard)}></button>
              </div>
              <div className='single-chat'>

                <button onClick={() => setFlipChatCard(!flipChatCard)}></button>
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