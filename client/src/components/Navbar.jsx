import { useRef, useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import avatar1 from '../assets/avatars/avatar1.png';
import avatar2 from '../assets/avatars/avatar2.png';
import avatar3 from '../assets/avatars/avatar3.png';
import avatar4 from '../assets/avatars/avatar4.png';
import avatar5 from '../assets/avatars/avatar5.png';
import avatar6 from '../assets/avatars/avatar6.png';
import avatarFallback from '../assets/avatars/avatar-fallback.png';

const avatars = {
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
};

const getAvatarImage = (avatarName) => {
    return avatars[avatarName] || avatarFallback;
};

const Navbar = ({ openProfileModal, handleLoginSignupModal }) => {
    let { authToken, user, loading } = useAuth();

    let menuRef = useRef(null);
    let [menuOpen, setMenuOpen] = useState(false);

    const menuHandler = () => {
        setMenuOpen((prev) => !prev);
    };

    const handleSignupBtn = () => {
        handleLoginSignupModal();
        menuHandler();
    };

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
                    {authToken ? (
                        <div className="profile-icon" onClick={openProfileModal}>
                            <img
                                src={getAvatarImage(user.avatar)}
                                alt="Profile Icon"
                                onError={(e) => {
                                    e.target.src = avatarFallback;
                                }}
                            />
                        </div>
                    ) : (
                        <div className="nav-right-btn">
                            <button onClick={handleLoginSignupModal}>Sign Up</button>
                        </div>
                    )}
                </div>
                <div className={`menu-icon ${menuOpen ? 'menu-active' : ''}`} onClick={menuHandler}>
                    <div className="hamburger"></div>
                </div>
            </nav>
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ top: '-100%' }}
                        animate={{ top: 0 }}
                        exit={{ top: '-100%' }}
                        transition={{ duration: 1, type: 'spring' }}
                        ref={menuRef}
                        className="menu"
                    >
                        {authToken && (
                            <div
                                className="menu-profile"
                                onClick={() => {
                                    openProfileModal();
                                    menuHandler();
                                }}
                            >
                                {loading ? (
                                    <>
                                        <div className="menu-profile-icon-loader"></div>
                                        <div className="menu-profile-dets-loader">
                                            <div className="menu-profile-dets-text-loader"></div>
                                            <div className="menu-profile-dets-text-loader"></div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="menu-profile-icon">
                                            <img
                                                src={getAvatarImage(user.avatar)}
                                                alt="Profile Icon"
                                                onError={(e) => {
                                                    e.target.src = avatarFallback;
                                                }}
                                            />
                                        </div>
                                        <div className="menu-profile-dets">
                                            <h1>{user.name}</h1>
                                            <h3>{user.email}</h3>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        <h1>Navigation</h1>
                        <div className="menu-links">
                            <NavLink to="/" onClick={menuHandler}>
                                Home
                            </NavLink>
                            <NavLink to="/vehicles" onClick={menuHandler}>
                                Vehicles
                            </NavLink>
                            <NavLink to="/about" onClick={menuHandler}>
                                About
                            </NavLink>
                            {!authToken && (
                                <div className="menu-btn">
                                    <button onClick={handleSignupBtn}>Sign Up</button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
