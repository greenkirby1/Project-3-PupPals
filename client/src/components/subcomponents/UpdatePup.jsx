import Form from './Form.jsx'
import { getToken } from '../../lib/auth'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function UpdatePup(){

  const fields = {
    image: {
      type: 'text',
      placeholder: 'upload an image'
    },
    bio: 'text',
    //string needs to be boolean
    neutered: {
      type: 'select',
      placeholder: 'select yes or no',
      options: ['yes', 'no']
    },
    // favorite and dislike are objects
    favorites: { 
      type: 'multi',
      placeholder: 'select multi options'
    },
    dislikes: {
      type: 'multi',
      placeholder: 'select multi options'
    }
    }
    
    const { pupId } = useParams()

    async function handleUpdate(formData){
      console.log('handle create:', formData)
      console.log('Type of name:', typeof formData.pupName)
      console.log('Type of bio:', typeof formData.bio)
      console.log('Type of breed:', typeof formData.breed)
      console.log('Type of birthday:', typeof formData.birthday)
      console.log('Type of favorites:', typeof formData.favorites)
      console.log('Type of dislikes:', typeof formData.dislikes)
      console.log('Type of image:', typeof formData.image)
      console.log('Type of gender:', typeof formData.gender)
      console.log('Type of neuted:', typeof formData.neutered)
      await axios.put(`/api/pups/${pupId}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    }
    

    // function loadFields(){
    //   return axios.get(`/api/profile`)
    // }


  return (
    <div className="form-page">
    <h1>Update your pup</h1>
    <Form request={handleUpdate} fields={fields} submit="Update Pup" />
  </div>
  )
}