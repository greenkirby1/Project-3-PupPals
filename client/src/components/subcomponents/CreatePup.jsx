import Form from './Form.jsx'
import { getToken } from '../../lib/auth'
import axios from 'axios'

export default function CreatePup(){


  const fields = {
  pupName: { 
    type: 'text',
    placeholder: 'your pups name here'
  },
  image: {
    type: 'file',
    placeholder: 'upload an image'
  },
  birthday: {
    type: 'date',
    placeholder: 'puppy b-day'
  },
  breed: 'text',
  bio: 'text',
  gender: {
    type: 'select',
    placeholder: 'select gender',
    options: ['bitch', 'dog']
  },
  neutered: {
    type: 'select',
    placeholder: 'select yes or no',
    options: ['yes', 'no']
  },
  favorites: { 
    type: 'multi',
    placeholder: 'select multi options'
  },
  dislikes: {
    type: 'multi',
    placeholder: 'select multi options'
  }
  }
  

  async function handleCreate(formData){
    const { data } = await axios.post('/pups', formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    console.log(data)
    console.log(formData)
  }

  return (
    <div className="form-component">
    <h1>Create Your Pup</h1>
    <Form request={handleCreate} fields={fields} submit="Upload Pup"/>
  </div>
  )

}