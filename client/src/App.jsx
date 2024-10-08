import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Routing from './utils/Routing'
import { useLocation } from 'react-router-dom'
import ProfileModal from './components/ProfileModal'
import LoginSignupModal from './components/LoginSignupModal'
import { AnimatePresence } from 'framer-motion'
import { useContext } from 'react'
import { LoginModalContext } from './contexts/LoginModalContext'

const App = () => {
  let [profileOpen, setProfileOpen] = useState(false)

  let openProfileModal = () => {
    setProfileOpen(true)
  }

  let closeProfileModal = () => {
    setProfileOpen(false)
  }

  let { isLoginSignupModal, handleLoginSignupModal } = useContext(LoginModalContext)

  let location = useLocation()
  let pathname = location.pathname
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <>
      <Navbar openProfileModal={openProfileModal} handleLoginSignupModal={handleLoginSignupModal} />
      <AnimatePresence>
        {profileOpen && <ProfileModal closeProfileModal={closeProfileModal} />}
      </AnimatePresence>
      <AnimatePresence>
        {isLoginSignupModal && <LoginSignupModal handleLoginSignupModal={handleLoginSignupModal} />}
      </AnimatePresence>
      <Routing />
      <div className="bottom-bar"></div>
      <div className="left-bar"></div>
      <div className="right-bar"></div>
    </>
  )
}

export default App
