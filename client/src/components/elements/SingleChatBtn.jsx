
export default function SingleChat({ 
  findCurrentChat, 
  findCurrentPup, 
  flipChatCard, 
  setFlipChatCard, 
  _id, 
  messages, 
  pups,
  updatedAt,
  styles 
}) {

  return (
    <button
      style={styles.flipBtn}
      onClick={() => {
        setFlipChatCard(!flipChatCard)
        findCurrentChat(_id)
        findCurrentPup(pups)
      }}
    >
      {messages[messages.length - 1].message}
      <br />
      Sent at {new Date(updatedAt).toDateString()}
    </button>
  )
}