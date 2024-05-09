import axios from 'axios'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axios.get('/api/users')
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])
  return (
    <h1>Hello World</h1>
  )
}

export default App
