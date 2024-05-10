import { useState, useEffect, useCallback } from "react"
import axios from 'axios'
import { getToken } from "../../lib/auth"
import Form from "../subcomponents/Form"
import ReactCardFlip from 'react-card-flip'
import ReactFlipCard from 'reactjs-flip-card'

export default function Profile() {

  // * States
  const [userProfile, setUserProfile] = useState()
  const [userChat, setUserChat] = useState()
  const [profileError, setProfileError] = useState('')
  const [chatError, setChatError] = useState('')
  const [flipUserCard, setFlipUserCard] = useState(false)
  const [flipPupCard, setFlipPupCard] = useState(false)
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

  function handlePupFlip() {
    if ()
  }

  console.log(userChat)

  return (
    <div>
      {userProfile && userChat ?
        <div className='container' style={{ height: '100vh', width: '100vh' }}>
          <div className='card-wrapper'>
            <ReactCardFlip isFlipped={flipUserCard}>
              <div className='user-profile' style={{ height: '600px', width: '200px' }}>
                <dl>
                  <dt>Full Name:</dt>
                  <dd>{userProfile.firstName} {userProfile.lastName}</dd>
                  <dt>Age:</dt>
                  <dd>{userProfile.age}</dd>
                  <dt>Email:</dt>
                  <dd>{userProfile.email}</dd>
                  <dt>Location:</dt>
                  <dd>{userProfile.location}</dd>
                </dl>
                <button onClick={() => setFlipUserCard(!flipUserCard)}>Edit Profile</button>
              </div>
              <div className='update-profile' style={{ height: '600px', width: '200px' }}>
                <h2>user update form here</h2>
                <button onClick={() => setFlipUserCard(!flipUserCard)}>Save Profile</button>
              </div>
            </ReactCardFlip>
            {userProfile.pupsCreated.length ?
              userProfile.pupsCreated.map(({ _id, pupName, image, gender, birthday, breed, bio, dislikes, favorites, neutered, owner }) => (
                <ReactCardFlip key={_id} isFlipped={flipPupCard}>
                  <div className='single-pup'>
                    <div className='wrapper-one'>
                      <div className='top-wrapper'>
                        <img src={image} alt={`${_id}-${owner}`} />
                        <div className='top-wrapper'><span>Gender:</span> {gender}</div>
                        <div><span>Neutered/Spayed:</span> {neutered ? 'Yes' : 'No'}</div>
                      </div>
                      <div className='top-wrapper'>
                        <div><span>Name:</span> {pupName}</div>
                        <div><span>Birthday:</span> {birthday}</div>
                        <div><span>Bio:</span> {bio}</div>
                      </div>
                    </div>
                    <div><span>Breed:</span> {breed}</div>
                    <div><span>Favourites:</span> {favorites.join(', ').toLowerCase()}</div>
                    <div><span>Dislikes:</span> {dislikes.join(', ').toLowerCase()}</div>
                    <button onClick={() => setFlipPupCard(!flipPupCard)}>Edit Profile</button>
                  </div>
                  <div className='update-pup'>
                    <h2>pup update form here</h2>
                    <button onClick={() => setFlipPupCard(!flipPupCard)}>Save Profile</button>
                  </div>
                </ReactCardFlip>
              ))
              :
              <h2>add pups...</h2>
            }
            <ReactCardFlip isFlipped={flipChatCard}>
              <div className='all-chats'>
                {/* {userChat.length ?

                  :
                  <h2>You don't have any matches yet...</h2>
                } */}
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