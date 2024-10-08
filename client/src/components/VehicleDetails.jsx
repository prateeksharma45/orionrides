import './VehicleDetails.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import PreviewImage from './PreviewImage'
import { AnimatePresence } from 'framer-motion'
import BookRide from './BookRide'
import { motion } from 'framer-motion'
import Footer from './Footer'
import { useAuth } from '../contexts/AuthContext'
import { LoginModalContext } from '../contexts/LoginModalContext'

const VehicleDetails = () => {
    let { vehicleId } = useParams()
    let [carInfo, setCarInfo] = useState({})
    let { authToken } = useAuth()

    let { handleLoginSignupModal } = useContext(LoginModalContext)

    const getVehicleDets = async () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vehicles/${vehicleId}`)
            .then(response => response.json())
            .then(data => {
                setCarInfo(data)
            })
            .catch(error => console.error('Error fetching car: ', error));
    }

    useEffect(() => {
        try {
            getVehicleDets()
        } catch (error) {
            console.log("Error fetching vehicle details:", error);
        }
    }, [vehicleId])

    let [previewImage, setPreviewImage] = useState(false)

    const closeImagePreview = () => {
        setPreviewImage(!previewImage)
    }

    let [bookRideModal, setBookRideModal] = useState(false)

    const closeBookRideModal = () => {
        setBookRideModal(!bookRideModal)
    }

    useEffect(() => {
        if (carInfo) {
            document.title = `${carInfo.car_name} - Orion Rides`;
        }
    }, [carInfo]);

    return (
        <>
            <AnimatePresence>
                {previewImage && <PreviewImage url={carInfo.image_url} closeImagePreview={closeImagePreview} />}
                {bookRideModal && <BookRide closeBookRideModal={closeBookRideModal} carId={carInfo._id} getVehicleDets={getVehicleDets} />}
            </AnimatePresence>
            <motion.div
                initial={{ y: "2rem", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "2rem", opacity: 0 }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                }}
                className="vehicle-details-page">
                <div className='vehicle-details'>
                    <div className="vehicle-details-image" onClick={() => setPreviewImage(!previewImage)}>
                        <img src={carInfo.image_url} alt={carInfo.car_name} />
                        <div className="location">
                            <i className="fa-solid fa-location-dot"></i>
                            {carInfo.location}
                        </div>
                    </div>
                    <div className="vehicle-info">
                        <div className="vehicle-info-name">
                            <h2>{carInfo.brand_name}</h2>
                            <h1>{carInfo.car_name}</h1>
                            <div className="rating">
                                <div className="stars">
                                    {carInfo.customer_ratings}
                                    {
                                        Array.from({ length: 5 }, (elem, index) => {
                                            let num = index + 0.5
                                            const rating = carInfo.customer_ratings || 0

                                            return (
                                                <span key={index} className='star'>
                                                    {
                                                        carInfo.customer_ratings && (
                                                            rating >= index + 1 ? (
                                                                <i className="fa-solid fa-star"></i>
                                                            ) : rating >= num ? (
                                                                <i className="fa-regular fa-star-half-stroke"></i>
                                                            ) : (
                                                                <i className="fa-regular fa-star"></i>
                                                            )
                                                        )
                                                    }
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <p>{carInfo.description}</p>
                        <div className="vehicle-info-actions">
                            <h3 className="price">
                                &#8377;{carInfo.price_per_day}<span>/day</span>
                            </h3>
                            <button disabled={!authToken || !carInfo.availability} onClick={() => setBookRideModal(!bookRideModal)}>
                                {carInfo.availability ? "Book A Ride" : "Unavailable"}
                            </button>
                            <p>
                                {
                                    !authToken ? (
                                        <>
                                            You're not logged in. <span onClick={() => handleLoginSignupModal()}>Register here!</span>
                                        </>
                                    ) : null
                                }
                            </p>
                        </div>
                        <div className="vehicle-specs">
                            <table>
                                <caption>Specs</caption>
                                <tbody>
                                    <tr>
                                        <td>Year</td>
                                        <td>{carInfo.model_year}</td>
                                    </tr>
                                    <tr>
                                        <td>Average</td>
                                        <td>{carInfo.average} KMPL</td>
                                    </tr>
                                    <tr>
                                        <td>Fuel Type</td>
                                        <td>{carInfo.fuel_type}</td>
                                    </tr>
                                    <tr>
                                        <td>Engine</td>
                                        <td>{carInfo.engine}</td>
                                    </tr>
                                    <tr>
                                        <td>Transmission</td>
                                        <td>{carInfo.transmission}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </motion.div >
            <Footer />
        </>
    )
}

export default VehicleDetails
