import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from '../components/Home'
import VehiclePage from '../components/VehiclePage'
import VehicleDetails from '../components/VehicleDetails'
import About from '../components/About'
import NotFoundPage from '../components/NotFoundPage'

const Routing = () => {
    let location = useLocation()
    let pathname = location.pathname
    return (

        <AnimatePresence mode='wait' >
            <Routes location={location} key={location.pathname} >
                <Route path='/' element={<Home />} />
                <Route path='/vehicles' element={<VehiclePage />} />
                <Route path='/vehicles/:vehicleId' element={<VehicleDetails />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </AnimatePresence>
    )
}

export default Routing
