import Form from '../subcomponents/Form.jsx'
import axios from 'axios'
import { setToken } from '/Users/mollygregson/PROJECTS/project-3-puppals/Project-3---PupPals/client/src/lib/auth.js'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  async function handleLogin(formData){
    const { data: { token } } = await axios.post('/api/login', formData)
    setToken(token)
    navigate('/profile')
  }

  const fields = {
    email: 'email',
    password: 'password'
  }

  return (
    <div className="form-page">
      <h1>Login</h1>
      <Form request={handleLogin} fields={fields} submit="Login" />
    </div>
  )
}