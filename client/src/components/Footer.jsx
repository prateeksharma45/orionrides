import { Link, useNavigate } from 'react-router-dom'
import './Footer.css'
import { motion } from 'framer-motion'

const Footer = () => {
    let navigate = useNavigate()
    const abouttBtnHandler = () => {
        navigate('/about')
    }
    return (
        <motion.footer
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "2rem", opacity: 0 }}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
        >
            <div className="footer-container">
                <div className="footer-top">
                    <Link to="/">OrionRides.</Link>
                    <button onClick={abouttBtnHandler}>What’s OrionRides? Click Here!<i className="fa-solid fa-arrow-right"></i></button>
                </div>
                <div className="footer-mid">
                    <div className="footer-mid-left">
                        <h3>Navigation</h3>
                        <div className="footer-links">
                            <Link to="/">Home</Link>
                            <Link to="/vehicles">Vehicles</Link>
                            <Link to="/about">About</Link>
                        </div>
                    </div>
                    <div className="footer-mid-right">
                        All Rights Reserved &copy; 2024
                    </div>
                </div>
                <div className="footer-bottom">
                    <h1>Crafted by <Link to="https://prateeksharma.xyz" target='_blank'>Prateek Sharma</Link></h1>
                </div>
            </div>
        </motion.footer>
    )
}

export default Footer
