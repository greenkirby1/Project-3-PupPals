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

  useEffect(() => findCurrentChat(_id), [userChat])

  return (
    <button
      style={styles.flipBtn}
      onClick={() => {
        setFlipChatCard(!flipChatCard)
        findCurrentPup(pups)
      }}
    >
      {messages[messages.length - 1].message}
      <br />
      Sent at {new Date(updatedAt).toDateString()}
    </button>
  )
}