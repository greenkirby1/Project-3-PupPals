import { useState, useEffect, useCallback } from "react"
import axios from 'axios'
import { getToken } from "../../lib/auth"
import Form from "../subcomponents/Form"
import PupCard from '../elements/PupCard'
import UserCard from "../elements/UserCard"
import ChatCard from "../elements/ChatCard"



export default function Profile() {

  // * States
  const [userProfile, setUserProfile] = useState()
  const [userChat, setUserChat] = useState()
  const [profileError, setProfileError] = useState('')
  const [chatError, setChatError] = useState('')

  // * Inline Styles
  const styles = {
    card: {
      margin: '0.8rem',
      maxHeight: '46vmin',
      minWidth: '450px',
      padding: '1rem',
      borderRadius: '10px',
      backgroundColor: 'white'
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column'
    },
    flexNormal: {
      display: 'flex'
    },
    flipBtn: {
      backgroundColor: '#998976',
      border: '1px solid #998976',
      borderRadius: '10px',
      color: 'white',
      fontWeight: 'bold',
      padding: '0.3rem 1rem'
    }
  }

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
      console.log(data)
      // console.log(data)
    } catch (error) {
      setChatError(error.message)
    }
  }

  useEffect(() => {
    getUserProfile()
    getUserChat()
  }, [])

  return (
    <div>
      {userProfile && userChat ?
        <div className='container'>
          <div className='card-wrapper'>
            <UserCard 
              userProfile={userProfile} 
              styles={styles}
            />
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
                    styles={styles}
                  />
                ))
                :
                <h2>add pups...</h2>
              }
            </div>
            <ChatCard 
              userChat={userChat}
              userProfile={userProfile}
              styles={styles}
            />
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