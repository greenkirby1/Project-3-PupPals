import { useState, useEffect } from "react"
import axios from 'axios'

export default function Profile() {

  // * States
  const [userProfile, setUserProfile] = useState()
  const [error, setError] = useState('')

  const { VITE_BASE_URL } = import.meta.env

  console.log(VITE_BASE_URL)

  // API Calls
  // api/profile
  // api/chats 123
  useEffect(() => {
    async function getUserProfile() {
      try {
        const { data } = await axios.get(``)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [userProfile])

  return <h1>Profile</h1>
}