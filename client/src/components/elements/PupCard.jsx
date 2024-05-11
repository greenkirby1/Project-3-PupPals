import ReactCardFlip from 'react-card-flip'
import { useState } from 'react'

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
  owner
}) {

  console.log(_id)

  const [flipPupCard, setFlipPupCard] = useState(false)

  return (
    <ReactCardFlip isFlipped={flipPupCard}>
      <div className='single-pup'>
        <div className='wrapper-one'>
          <div className='top-wrapper'>
            <img src={image} alt={`${_id}-${owner}`} />
            <div className='top-wrapper'><span>Gender:</span> {gender}</div>
            <div><span>Neutered/Spayed:</span> {neutered ? 'Yes' : 'No'}</div>
          </div>
          <div className='top-wrapper'>
            <div><span>Name:</span> {pupName}</div>
            <div><span>Birthday:</span> {birthday}</div>
            <div><span>Bio:</span> {bio}</div>
          </div>
        </div>
        <div><span>Breed:</span> {breed}</div>
        <div><span>Favourites:</span> {favorites.join(', ').toLowerCase()}</div>
        <div><span>Dislikes:</span> {dislikes.join(', ').toLowerCase()}</div>
        <button onClick={() => setFlipPupCard(!flipPupCard)}>Edit Profile</button>
      </div>
      <div className='update-pup'>
        <h2>pup update form here</h2>
        <button onClick={() => setFlipPupCard(!flipPupCard)}>Save Profile</button>
      </div>
    </ReactCardFlip>
  )
}