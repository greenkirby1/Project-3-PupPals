import Form from '../subcomponents/Form.jsx'
import axios from 'axios'
import { setToken } from '../../lib/auth.js'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const fields = {
    email: 'email',
    password: 'password'
  }

  const navigate = useNavigate()

  async function handleLogin(formData){
    const { data: { token } } = await axios.post('/api/login', formData)
    setToken(token)
    navigate('/profile')
  }

  return (
    <div className="form-page">
      <h1>Login with your email address</h1>
      <Form request={handleLogin} fields={fields} submit="Login" />
    </div>
  )
}