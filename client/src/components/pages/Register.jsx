import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FormComponent from '../subcomponents/FormComponent.jsx'

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
      <p style={{ textAlign: 'center', fontSize: '20px' }}><span style={{ fontWeight: '500', fontSize: '25px' }}>Sign Up</span> with your email address</p>
      <FormComponent request={handleRegister} fields={fields} submit="Sign Up" />
    </div>
  )
}