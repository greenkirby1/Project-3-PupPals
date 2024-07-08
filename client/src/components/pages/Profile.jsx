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
      width: '450px',
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column'
    },
    flexNormal: {
      display: 'flex'
    },
    flipBtn: {
      backgroundColor: 'var(--dark-color)',
      border: 'none',
      borderRadius: '10px',
      color: 'white',
      padding: '6px',
      width: '80%',
    },
    pupImage: {
      display: 'flex',
      objectFit: 'cover',
      width: '200px',
      height: '200px',
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
          <h1 className='profile-title oleo-script-bold'
            style={{
              fontSize: '150px',
              color: 'white',
              fontStyle: 'italic',
            }}>
            {userProfile.firstName}&apos;s Pals
          </h1>
          <div className='card-wrapper' style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <div style={{ flex: '1', marginRight: '10px', height: '100%' }}>
              <UserCard
                userProfile={userProfile}
                getUserProfile={getUserProfile}
                styles={styles}
              />
            </div>
            <div className='pup-card-wrapper' style={{ flex: '2', display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
              erro{userProfile.pupsCreated.length ?
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
                    userProfile={userProfile}
                    getUserProfile={getUserProfile}
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
            <div style={{ flex: '1', height: '100%' }}>
              <ChatCard
                userChat={userChat}
                userProfile={userProfile}
                styles={styles}
                getUserChat={getUserChat}
              />
            </div>
          </div>
        </div>
        :
        profileError || chatError ?
          <p className='text-danger'>{profileError || chatError}</p>
          :
          <h2 className='oleo-script-regular'>Loading...</h2>
      }
    </div >
  )
}