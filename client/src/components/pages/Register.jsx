import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from '../subcomponents/Form.jsx'

export default function Register() {
  
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
      age: {
        type: 'number',
        placeholder: 'adults only'
      },
      password: {
        type: 'password',
        placeholder: '***********'
      },
      passwordConfirmation: {
        type: 'password',
        placeholder: '***********'
      }
    }

  const navigate = useNavigate()

  async function handleRegister(formData) {
    await axios.post('/api/register', formData)
    console.log(formData)
    navigate('/login')
  }

  return (
    <div className="form-page">
      <h1>Sign Up with your email address</h1>
      <Form request={handleRegister} fields={fields} submit="Sign Up" />
    </div>
  )
}