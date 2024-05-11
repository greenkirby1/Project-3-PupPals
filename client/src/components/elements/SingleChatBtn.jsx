
export default function SingleChat({ 
  findCurrentChat, 
  flipChatCard, 
  setFlipChatCard, 
  _id, 
  messages, 
  updatedAt 
}) {

  return (
    <button
      onClick={() => {
        setFlipChatCard(!flipChatCard)
        findCurrentChat(_id)
      }}
    >
      {messages[messages.length - 1].message}
      <br />
      Sent at {updatedAt}
    </button>
  )
}