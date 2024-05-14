import { useState, useEffect, useCallback } from "react"
import axios from 'axios'
import { getToken } from "../../lib/auth"
import PupCard from '../elements/PupCard'
import UserCard from "../elements/UserCard"
import ChatCard from "../elements/ChatCard"
import CreatePupCard from '../elements/CreatePupCard.jsx'



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
      padding: '1rem',
      borderRadius: '10px',
      backgroundColor: 'white',
      maxWidth: '448px',
    },
    pupSize: {
      maxHeight: '46vmin',
      Width: '450px',
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
      padding: '0.3rem 1rem',
      margin: '0.5rem'
    },
    pupImage: {
      objectFit: 'cover',
      width: '150px',
      height: '150px',
      borderRadius: '10px'
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

  // async function getUserChat() {
  //   try {
  //     const { data } = await axios.get('/api/chats', {
  //       headers: {

  //         Authorization: `Bearer ${getToken()}`
  //       }
  //     })
  //     setUserChat(data)
  //     console.log(data)
  //     // console.log(data)
  //   } catch (error) {
  //     setChatError(error.message)
  //   }
  // }

  // const getUserChat = useCallback(async function () {
  //   try {
  //     const { data } = await axios.get('/api/chats', {
  //       headers: {

  //         Authorization: `Bearer ${getToken()}`
  //       }
  //     })
  //     setUserChat(data)
  //   } catch (error) {
  //     setChatError(error.message)
  //   }
  // }

  const getUserChat = useCallback(async function () {
    try {
      const { data } = await axios.get('/api/chats', {
        headers: {

          Authorization: `Bearer ${getToken()}`
        }
      })
      setUserChat(data)
    } catch (error) {
      setChatError(error.message)
    }
  }, [])

  useEffect(() => {
    getUserProfile()
    getUserChat()
  }, [])

  return (
    <div>
      {userProfile && userChat ?
        <div className='page-container'>
          <h1>Welcome to your page, {userProfile.firstName}!</h1>
          <div className='card-wrapper'>
            <UserCard
              userProfile={userProfile}
              getUserProfile={getUserProfile}
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
                <div className='create-pup-wrapper'>
                  <CreatePupCard
                    userProfile={userProfile}
                    getUserProfile={getUserProfile}
                    styles={styles}
                  />
                </div>
              }
            </div>
            <ChatCard
              userChat={userChat}
              userProfile={userProfile}
              styles={styles}
              getUserChat={getUserChat}
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