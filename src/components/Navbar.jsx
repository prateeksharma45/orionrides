import { useRef, useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    let menuRef = useRef(null)
    let [menuOpen, setMenuOpen] = useState(false)
    let menuHandler = () => {
        setMenuOpen((prev) => !prev)
    }

    return (
        <header>
            <nav>
                <div className="nav-left">
                    <NavLink to="/">OrionRides.</NavLink>
                </div>
                <div className="nav-right">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/vehicles">Vehicles</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                </div>
                <div className={`menu-icon ${menuOpen ? "menu-active" : ""}`} onClick={menuHandler}>
                    <div className="hamburger"></div>
                </div>
            </nav>
            <AnimatePresence>
                {
                    menuOpen && (
                        <motion.div
                            initial={{ top: '-100%' }}
                            animate={{ top: 0 }}
                            exit={{ top: '-100%' }}
                            transition={{ duration: 1, type: 'spring' }}
                            ref={menuRef} className="menu">
                            <h1>Navigation</h1>
                            <div className="menu-links">
                                <NavLink to="/" onClick={menuHandler}>Home</NavLink>
                                <NavLink to="/vehicles" onClick={menuHandler}>Vehicles</NavLink>
                                <NavLink to="/about" onClick={menuHandler}>About Us</NavLink>
                                <NavLink to="/contact" onClick={menuHandler}>Contact</NavLink>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </header>
    )
}

export default Navbar
