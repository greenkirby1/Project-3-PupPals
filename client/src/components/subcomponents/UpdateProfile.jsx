import Form from './Form.jsx'
import { getToken } from '../../lib/auth'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function UpdateProfile(){

  const fields = {
    firstName: {
      type: 'text',
      placeholder: 'your first name'
    },
    lastName: {
      type: 'text',
      placeholder: 'your last name'
    },
    email: {
      type: 'email',
      placeholder: 'example@email.com'
    },
    location: 'text',
  }
    

  const { userId } = useParams()
  async function handleProfileUpdate(formData) {
    await axios.put(`/api/profile/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      console.log(formData)
    }


  return (
    <div className="form-page">
    <h1>Update your Profile</h1>
    <Form request={handleProfileUpdate} fields={fields} submit="Update Profile" />
  </div>
  )
}