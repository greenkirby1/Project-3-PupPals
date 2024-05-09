import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './components/pages/Home.jsx'
import Register from './components/pages/Register.jsx'
import Login from './components/pages/Login.jsx'
import Profile from './components/pages/Profile.jsx'

import './styles/main.scss'

// Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
