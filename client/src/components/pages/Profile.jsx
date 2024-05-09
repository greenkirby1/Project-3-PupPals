import { useState, useEffect } from "react"
import axios from 'axios'
import ReactCardFlip from 'react-card-flip'
import UserProfile from "../subcomponents/UserProfile"
import ReactFlipCard from 'reactjs-flip-card'

export default function Profile() {

  // * States
  const [userProfile, setUserProfile] = useState()
  const [userChat, setUserChat] = useState()
  const [profileError, setProfileError] = useState('')
  const [chatError, setChatError] = useState('')
  const [isFlipped, setIsFlipped] = useState(false)
  const [optionalToggle, setOptionalToggle] = useState(false)

  const { VITE_ACCESS_TOKEN } = import.meta.env

  const styles = {
    card: {background: 'pink', color: 'white', borderRadis: 20}
  }

  // * API Calls
  useEffect(() => {
    async function getUserProfile() {
      try {
        const { data } = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${VITE_ACCESS_TOKEN}`
          }
        })
        setUserProfile(data)
        console.log(data)
      } catch (error) {
        setProfileError(error.message)
      }
    }
    getUserProfile()
  }, [])

  useEffect(() => {
    async function getUserChat() {
      try {
        const { data } = await axios.get('/api/chats', {
          headers: {
            Authorization: `Bearer ${VITE_ACCESS_TOKEN}`
          }
        })
        setUserChat(data)
        console.log(data)
      } catch (error) {
        setChatError(error.message)
      }
    }
    getUserChat()
  }, [])

  function handleClick() {
    setIsFlipped(!isFlipped)
  }

  console.log()

  return (
    <>
      <h1>Welcome to your page, {userProfile.firstName}!</h1>
      {/* <div className='container'>
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
          <div className='flip-card-inner'>
            <div className='card-content'>
              <h2>Hello</h2>
              <button onClick={handleClick}>Turn</button>
            </div>
            <div className='flip-card-back'>
              <div className='card-content'>
                <h2>bye</h2>
                <button onClick={handleClick}>Turn</button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <button onClick={() => setOptionalToggle(!optionalToggle)}>click</button>
      <ReactFlipCard
        flipByProp={optionalToggle}
        flipTrigger={'disabled'}
        frontStyle={styles.card}
        backStyle={styles.card}
        frontComponent={
          <div className='user-details'>
            {/* <h2>Your Details</h2>
            <dl>
              <dt>First Name</dt>
              <dd>{userProfile.firstName}</dd>
            </dl> */}
            <h2>hello</h2>
            <ul>
              <li><span>First Name:</span> {userProfile.firstName}</li>
            </ul>
            <button onClick={() => setOptionalToggle(!optionalToggle)}>Turn</button>
          </div>
        }
        backComponent={
          <div className='update-user'>
            {/* <button onClick={() => setOptionalToggle(!optionalToggle)}>Turn back</button> */}
            hello
          </div>
        }
      />
    </>

  )
}