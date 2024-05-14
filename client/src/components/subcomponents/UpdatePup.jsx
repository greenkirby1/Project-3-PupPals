import FormComponent from '../subcomponents/FormComponent.jsx'
import { getToken } from '../../lib/auth'
import axios from 'axios'

export default function UpdatePup({_id}){
  // console.log(_id)

  const fields = {
    image: {
      type: 'file',
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
    

    async function handleUpdate(formData){
      try {
      await axios.put(`/api/pups/${_id}`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
    

    // function loadFields(){
    //   return axios.get(`/api/profile`)
    // }


  return (
    <div className="form-page">
    <h1>Update your pup</h1>
    <FormComponent request={handleUpdate} fields={fields} submit="Update Pup" />
  </div>
  )
}