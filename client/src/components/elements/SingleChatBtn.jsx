import { useEffect } from 'react'


export default function SingleChat({
  findCurrentChat,
  findCurrentPup,
  flipChatCard,
  setFlipChatCard,
  _id,
  messages,
  pups,
  updatedAt,
  styles,
  userChat
}) {

  useEffect(() => { findCurrentChat(_id) }, [userChat, findCurrentChat])

  return (
    <button
      style={styles.flipBtn}
      onClick={() => {
        setFlipChatCard(!flipChatCard)
        findCurrentChat(_id)
        findCurrentPup(pups)
      }}
    >
      {messages.length < 0 ?
      <div>
        {messages[messages.length - 1].message}
        <br />
        Sent at {new Date(updatedAt).toDateString()}

      </div>
      :
      <div>
        <h2>New Match</h2>
      </div>

      }
    </button>
  )
}