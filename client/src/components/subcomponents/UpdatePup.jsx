import FormComponent from '../subcomponents/FormComponent.jsx'
import { getToken } from '../../lib/auth'
import axios from 'axios'

export default function UpdatePup({_id, flipBack, userProfile }){
  // console.log(_id)

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
    //string
    gender: {
      type: 'select',
      placeholder: 'select gender',
      options: ['bitch', 'dog']
    },
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
      flipBack()
    } catch (error) {
      console.log(error)
    }
  }
    

console.log(userProfile.pupsCreated[0])

  function loadFields() {
    // console.log('this is in loadFields:', userProfile)
    // need to get the data from profile
    // console.log(userProfile.pupsCreated)
    // return userProfile
    return (userProfile.pupsCreated[0])
    //   console.log
    // )
  }


  return (
    <div className="form-page">
    <h1>Update your pup</h1>
    <FormComponent 
      request={handleUpdate} 
      fields={fields} 
      submit="Update Pup"
      onLoad={loadFields}
    />
  </div>
  )
}