import React, { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Routing from './utils/Routing'
import { useLocation } from 'react-router-dom'
import Footer from './components/Footer'

const App = () => {
  let location = useLocation()
  let pathname = location.pathname
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])
  return (
    <>
      <Navbar />
      <Routing />
      <Footer />
      <div className="bottom-bar"></div>
      <div className="left-bar"></div>
      <div className="right-bar"></div>
    </>
  )
}

export default App
