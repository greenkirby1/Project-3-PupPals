import ReactCardFlip from 'react-card-flip'
import { useState } from 'react'
import UpdatePup from '../subcomponents/UpdatePup.jsx'

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
  styles
}) {

  const [flipPupCard, setFlipPupCard] = useState(false)

  return (
    <ReactCardFlip isFlipped={flipPupCard}>
      <div className='pup-front' style={styles.card}>
        <div className='wrapper-one'>
          <div className='top-wrapper'>
            <img src={image} alt={`${_id}-${owner}`} />
            <div className='info-box'><span>Gender:</span> {gender}</div>
            <div className='info-box'><span>Neutered/Spayed:</span> {neutered ? 'Yes' : 'No'}</div>
          </div>
          <div className='top-wrapper'>
            <div className='info-box'><span>Name:</span> {pupName}</div>
            <div className='info-box'><span>Birthday:</span> {birthday}</div>
            <div className='info-box'><span>Bio:</span> {bio}</div>
          </div>
        </div>
        <div className='info-box'><span>Breed:</span> {breed}</div>
        <div className='info-box'><span>Favourites:</span> {favorites.join(', ').toLowerCase()}</div>
        <div className='info-box'><span>Dislikes:</span> {dislikes.join(', ').toLowerCase()}</div>
        <button style={styles.flipBtn} onClick={() => setFlipPupCard(!flipPupCard)}>Edit Profile</button>
      </div>
      <div className='pup-back' style={styles.card}>
        <UpdatePup _id={_id}/>
        <button style={styles.flipBtn} onClick={() => setFlipPupCard(!flipPupCard)}>Save Profile</button>
      </div>
    </ReactCardFlip>
  )
}