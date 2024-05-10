import CreatePup from '../subcomponents/CreatePup.jsx'
import UpdatePup from '../subcomponents/UpdatePup.jsx'
import UpdateProfile from '../subcomponents/UpdateProfile.jsx'

export default function Profile() {

  // API Calls
  // api/profile
  // api/chats 123
  // api/chats/1 1

  return (
    <>
      <CreatePup />
      <UpdatePup />
      <UpdateProfile />
    </>
  )
}