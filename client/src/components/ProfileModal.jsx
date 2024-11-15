import { useEffect, useRef } from 'react';
import './ProfileModal.css';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import avatar1 from '../assets/avatars/avatar1.png';
import avatar2 from '../assets/avatars/avatar2.png';
import avatar3 from '../assets/avatars/avatar3.png';
import avatar4 from '../assets/avatars/avatar4.png';
import avatar5 from '../assets/avatars/avatar5.png';
import avatar6 from '../assets/avatars/avatar6.png';
import avatarFallback from '../assets/avatars/avatar-fallback.png';

const ProfileModal = ({ closeProfileModal }) => {
    let { user, logoutUser, authToken, userAuthentication, loading } = useAuth();
    let { showToast } = useToast();

    let profileModalBgRef = useRef(null);

    const handleBgClick = (event) => {
        if (event.target === profileModalBgRef.current) {
            closeProfileModal();
        }
    };

    const avatars = {
        avatar1,
        avatar2,
        avatar3,
        avatar4,
        avatar5,
        avatar6,
    };

    const getAvatarImage = (avatarName) => avatars[avatarName] || avatarFallback;

    const cancelRental = async (carId) => {
        try {
            let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cancel-ride/${carId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                method: "POST",
            });
            if (res.ok) {
                userAuthentication();
                showToast("Rental cancelled successfully!", 'success');
            }
        } catch (error) {
            console.log("Error in cancelling the rental: ", error);
            showToast("Failed to cancel rental!", 'error');
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
            ref={profileModalBgRef}
            className="profile-modal-wrapper"
            onClick={handleBgClick}
        >
            <motion.div
                initial={{ y: '2rem', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '2rem', opacity: 0 }}
                transition={{
                    duration: 0.3,
                    ease: 'backInOut',
                }}
                className="profile-modal"
            >
                <div className="close" onClick={closeProfileModal}>
                    <div className="close-icon"></div>
                </div>
                <h1>Profile</h1>
                {loading ? (
                    <div className="profile-info-loader">
                        <div className="profile-info-icon-loader"></div>
                        <div className="profile-info-dets-loader">
                            <div className="profile-info-dets-text-loader"></div>
                            <div className="profile-info-dets-text-loader"></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="profile-info">
                            <div className="profile-info-icon">
                                <img
                                    src={getAvatarImage(user.avatar)}
                                    alt="Profile Icon"
                                    onError={(e) => {
                                        e.target.src = avatarFallback;
                                    }}
                                />
                            </div>
                            <div className="profile-info-dets">
                                <h2>{user.name}</h2>
                                <h4>{user.email}</h4>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                closeProfileModal();
                                logoutUser();
                                showToast('You’ve been logged out!', 'success');
                            }}
                        >
                            Logout
                        </button>
                        <div className="profile-rented-cars-section">
                            <div className="profile-rented-cars-section-head">
                                {user.cars_rented.length === 0 ? (
                                    <p>
                                        No rentals yet!{' '}
                                        <Link to="/vehicles" onClick={() => closeProfileModal()}>
                                            Explore cars now!
                                        </Link>
                                    </p>
                                ) : (
                                    <h3>Your rentals</h3>
                                )}
                            </div>
                            {user.cars_rented.length !== 0 && (
                                <div className="profile-rented-cars-section-body">
                                    {user.cars_rented.map((rentedCar, index) => (
                                        <div key={index} className="rented-car">
                                            <div className="rented-car-image">
                                                <img
                                                    src={`${rentedCar.car.image_url}?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="rented-car-text">
                                                <h4>{rentedCar.car.brand_name}</h4>
                                                <h3>{rentedCar.car.car_name}</h3>
                                                <div className="rented-car-dates">
                                                    <p>
                                                        {new Date(rentedCar.pick_up_date).toLocaleDateString('en-GB')}
                                                    </p>
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                    <p>
                                                        {new Date(rentedCar.drop_off_date).toLocaleDateString('en-GB')}
                                                    </p>
                                                </div>
                                                <button onClick={() => cancelRental(rentedCar.car._id)}>
                                                    Cancel Rental
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ProfileModal;
