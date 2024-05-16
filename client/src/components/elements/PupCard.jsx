import ReactCardFlip from 'react-card-flip'
import { useState } from 'react'
import axios from 'axios'
import UpdatePup from '../subcomponents/UpdatePup.jsx'
import { getToken } from '../../lib/auth.js'

export default function PupCard({
  _id,
  pupName,
  image,
  gender,
  birthday,
  breed,
  bio,
  dislikes,
  favorites,
  neutered,
  owner,
  styles,
  getUserProfile,
  userProfile,
}) {

  const [flipPupCard, setFlipPupCard] = useState(false)

  const flipBack = async (formData) => {
    console.log('hit handle save')
    console.log('Form data:', formData)
    setFlipPupCard(!flipPupCard)
    getUserProfile()
  }

  // async function deletePup() {
  //   console.log('delete')
  //   try {
  //     const { data } = await axios.delete(`/api/pups/${_id}`, {
  //       headers: {
  //         Authorization: `Bearer ${getToken()}`
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  return (
    <ReactCardFlip isFlipped={flipPupCard}>
      {/* Front Card */}
      <div>
        <div className='pup-front' style={styles.card}>
          <div className='pup-image-wrapper'>
            <img className='pup-image' src={image} alt={`${_id}-${owner}`} style={styles.pupImage} />
            <div className='name-bio-wrapper'>
              <div className='pup-name'>{pupName}</div>
              <div className='pup-bio'>{bio}</div>
            </div>
          </div>
          <div className='info-wrapper'>
            <div className='info-box'><span>Gender:</span><br />{gender}</div>
            <div className='info-box'><span>Neutered/Spayed:</span><br />{neutered ? 'Yes' : 'No'}</div>
            <div className='info-box'><span>Birthday:</span><br />{birthday}</div>
          </div>
          <div className='info-wrapper'>
            <div className='info-box'><span>Breed:</span><br />{breed}</div>
            <div className='info-box'><span>Favourites:</span><br />{favorites.join(', ').toLowerCase()}</div>
            <div className='info-box'><span>Dislikes:</span><br />{dislikes.join(', ').toLowerCase()}</div>
          </div>
          <button
            style={styles.flipBtn}
            onClick={() => setFlipPupCard(!flipPupCard)}
          >
            Edit Profile
          </button>
        </div>
      </div>
      {/* Back Card */}
      <div>
        <div className='pup-back' style={styles.card}>
          <UpdatePup
            _id={_id}
            userProfile={userProfile}
            flipBack={flipBack}
          />
          <button style={styles.flipBtn} onClick={() => setFlipPupCard(!flipPupCard)}>Cancel</button>
        </div>
      </div>
    </ReactCardFlip>
  )
}