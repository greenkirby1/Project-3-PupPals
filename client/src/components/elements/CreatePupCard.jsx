import ReactCardFlip from "react-card-flip"
import { useState } from 'react'
import CreatePup from '../subcomponents/CreatePup.jsx'

export default function CreatePupCard({ styles, userProfile, getUserProfile }){

  const [flipCreatePupCard, setFlipCreatePupCard] = useState(false)

  return (
    <ReactCardFlip isFlipped={flipCreatePupCard}>
      <div className='create-pup-front' style={styles.card}>
      <button style={styles.flipBtn} onClick={() => setFlipCreatePupCard(!flipCreatePupCard)}>ADD PUP</button>
      </div>
      <div className='create-pup-back' style={styles.card}>
        <CreatePup 
          userProfile={userProfile}
          getUserProfile={getUserProfile}
        />
      </div>
    </ReactCardFlip>
  )
}
