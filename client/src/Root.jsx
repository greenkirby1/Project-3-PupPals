import { Outlet } from 'react-router-dom'

import Navbar from './components/subcomponents/Navbar'
import Footer from './components/subcomponents/Footer'

export default function Root() {

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
