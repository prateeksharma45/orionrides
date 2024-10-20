import { useRef, useState } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import avatar from '../assets/avatar.png'

const Navbar = ({ openProfileModal, handleLoginSignupModal }) => {
    let { authToken, user } = useAuth();

    let menuRef = useRef(null)
    let [menuOpen, setMenuOpen] = useState(false)
    let menuHandler = () => {
        setMenuOpen((prev) => !prev)
    }

    let handleSignupBtn = () => {
        handleLoginSignupModal()
        menuHandler()
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
                    <NavLink to="/about">About</NavLink>
                    {
                        authToken ? (
                            <div className="profile-icon" onClick={openProfileModal}>
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`}
                                    alt="Profile Icon"
                                    onError={(e) => { e.target.src = avatar }}
                                />
                            </div>
                        ) : (
                            <div className="nav-right-btn">
                                <button onClick={handleLoginSignupModal}>Sign Up</button>
                            </div>
                        )
                    }
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
                            {
                                authToken && (
                                    <div className="menu-profile" onClick={() => {
                                        openProfileModal();
                                        menuHandler();
                                    }}>
                                        {
                                            user ? (
                                                <>
                                                    <div className="menu-profile-icon">
                                                        <img
                                                            src={`${import.meta.env.VITE_BACKEND_URL}/${user.avatar}`}
                                                            alt="Profile Icon"
                                                            onError={(e) => { e.target.src = avatar }}
                                                        />
                                                    </div>
                                                    <div className="menu-profile-dets">
                                                        <h1>{user.name}</h1>
                                                        <h3>{user.email}</h3>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="menu-profile-icon-loader"></div>
                                                    <div className="menu-profile-dets-loader">
                                                        <div className="menu-profile-dets-text-loader"></div>
                                                        <div className="menu-profile-dets-text-loader"></div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                )
                            }
                            <h1>Navigation</h1>
                            <div className="menu-links">
                                <NavLink to="/" onClick={menuHandler}>Home</NavLink>
                                <NavLink to="/vehicles" onClick={menuHandler}>Vehicles</NavLink>
                                <NavLink to="/about" onClick={menuHandler}>About</NavLink>
                                {
                                    !authToken && (
                                        <div className="menu-btn">
                                            <button onClick={handleSignupBtn}>Sign Up</button>
                                        </div>
                                    )
                                }
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </header>
    )
}

export default Navbar
