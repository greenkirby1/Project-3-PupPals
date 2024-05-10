import ReactCardFlip from 'react-card-flip'
import { useState } from 'react'

export default function UserCard({ userProfile }) {

  const [flipUserCard, setFlipUserCard] = useState(false)

  return (
    <ReactCardFlip isFlipped={flipUserCard}>
      <div className='user-profile' style={{ height: '600px', width: '200px' }}>
        <dl>
          <dt>Full Name:</dt>
          <dd>{userProfile.firstName} {userProfile.lastName}</dd>
          <dt>Age:</dt>
          <dd>{userProfile.age}</dd>
          <dt>Email:</dt>
          <dd>{userProfile.email}</dd>
          <dt>Location:</dt>
          <dd>{userProfile.location}</dd>
        </dl>
        <button onClick={() => setFlipUserCard(!flipUserCard)}>Edit Profile</button>
      </div>
      <div className='update-profile' style={{ height: '600px', width: '200px' }}>
        <h2>user update form here</h2>
        <button onClick={() => setFlipUserCard(!flipUserCard)}>Save Profile</button>
      </div>
    </ReactCardFlip>
  )
}