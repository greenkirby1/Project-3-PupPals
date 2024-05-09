import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Form from '../subcomponents/Form.jsx'

export default function Register() {

const navigate = useNavigate()

async function handleRegister(formData){
  await axios.post('/api/register', formData)
  console.log(formData)
  navigate('/login')
}

  const fields = {
    firstName: 'text',
    lastName: 'text',
    email: 'email',
    password: 'password',
    location: 'text',
    age: 'number',
    passwordConfirmation: 'password'
  }

  return (
    <div className="form-page">
      <h1>Register</h1>
      <Form request={handleRegister} fields={fields} submit="Register" />
    </div>
  )
}