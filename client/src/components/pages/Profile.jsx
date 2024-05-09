import { useState, useEffect } from "react"
import axios from 'axios'

export default function Profile() {

  // * States
  const [userProfile, setUserProfile] = useState()
  const [error, setError] = useState('')

  const { VITE_ACCESS_TOKEN } = import.meta.env

  console.log(VITE_ACCESS_TOKEN)

  // API Calls
  // api/profile
  // api/chats 123
  useEffect(() => {
    async function getUserProfile() {
      try {
        const { data } = await axios.get(`/api/profile`, {
          headers: {
            'Authorization': `Bearer ${VITE_ACCESS_TOKEN}`
          }
        })
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getUserProfile()
  })

  return <h1>Profile</h1>
}