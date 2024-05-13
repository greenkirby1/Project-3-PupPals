import ReactCardFlip from 'react-card-flip'
import { useState } from 'react'
import UpdateProfile from '../subcomponents/UpdateProfile.jsx'

export default function UserCard({ userProfile, styles }) {

  const [flipUserCard, setFlipUserCard] = useState(false)

  return (
    <ReactCardFlip isFlipped={flipUserCard}>
      <div className='user-front' style={styles.card}>
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
      <div className='user-back' style={styles.card}>
        <UpdateProfile userProfile={userProfile} />
        <button onClick={() => setFlipUserCard(!flipUserCard)}>Save Profile</button>
      </div>
    </ReactCardFlip>
  )
}