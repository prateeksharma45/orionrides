import Category from './Categories'
import HeroSection from './HeroSection'
import RentalSteps from './RentalSteps'
import './Home.css'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Footer from './Footer'

const Home = () => {
    let vehicleCategoryData = [
        {
            name: "Sedans",
            url: "https://images.pexels.com/photos/3764986/pexels-photo-3764986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            name: "SUVs",
            url: "https://images.pexels.com/photos/15489298/pexels-photo-15489298/free-photo-of-white-lamborghini-urus-in-garage.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            name: "Supercars",
            url: "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            name: "Coupe",
            url: "https://images.pexels.com/photos/17338597/pexels-photo-17338597/free-photo-of-black-bentley-continental.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    ]

    useEffect(() => {
        document.title = 'Orion Rides - Quality Cars, Unmatched Experience';
    }, []);

    return (
        <>
            <motion.div
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "2rem", opacity: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                }}
                className='home'>
                <HeroSection />
                <Category data={vehicleCategoryData} />
                <RentalSteps />
            </motion.div>
            <Footer />
        </>
    )
}

export default Home
