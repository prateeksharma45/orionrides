import { useEffect } from 'react';
import './About.css'
import { motion } from 'framer-motion'
import Footer from './Footer';
import { Link } from 'react-router-dom';
import AboutImgJPG from '../assets/Mockup.jpg'
import AboutImgWEBP from '../assets/Mockup.webp'

const About = () => {
    useEffect(() => {
        document.title = 'Discover Orion Rides - Your Trusted Car Rental Partner';
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
                className='about-page'>
                <div className="about-section-img">
                    <picture>
                        <source srcSet={AboutImgWEBP} type="image/webp" />
                        <source srcSet={AboutImgJPG} type="image/jpg" />
                        <img src={AboutImgJPG} alt="About Section Image" />
                    </picture>
                </div>
                <div className="about-text">
                    <div className="about-text-elem">
                        <div className="about-text-elem-left">
                            <h1>About</h1>
                        </div>
                        <div className="about-text-elem-right">
                            <p>Developed by <Link to="https://prateeksharma.xyz" target='_blank'>Prateek Sharma</Link>, Orion Rides is a personal project that delivers a hassle-free solution for car rentals. The platform is built to streamline the process for users to find, book, and manage rental cars. The project combines intuitive design with cutting-edge technology to enhance the rental experience.</p>
                        </div>
                    </div>
                    <div className="about-text-elem">
                        <div className="about-text-elem-left">
                            <h1>Tech Stack</h1>
                        </div>
                        <div className="about-text-elem-right">
                            <ul>
                                <li><span>MongoDB</span> for the database</li>
                                <li><span>Express.js</span> for the backend</li>
                                <li><span>React.js</span> for the frontend</li>
                                <li><span>Node.js</span> for the server</li>
                            </ul>
                            <p>This project also incorporates <span>JWT</span>-based authentication for secure user access and <span>Mongoose</span> for seamless interaction with the database. The frontend experience is enhanced with the use of <span>Framer Motion</span> for smooth page transitions. The app is designed with scalability and performance in mind, offering a modern and responsive interface.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
            <Footer />
        </>
    )
}

export default About

