import './VehicleDetails.css'
import { useParams } from 'react-router-dom'
import carData from '../data/carData.json'
import { useEffect, useState } from 'react'
import PreviewImage from './PreviewImage'
import { AnimatePresence } from 'framer-motion'
import BookRide from './BookRide'
import { motion } from 'framer-motion'

const VehicleDetails = () => {
    let { vehicleName } = useParams()
    let [carInfo, setCarInfo] = useState({})

    useEffect(() => {
        carData.forEach(car => {
            if (car.car_name.replaceAll(" ", "-").toLowerCase() == vehicleName) {
                setCarInfo({ ...car })
            }
        });
        return () => {
            window.scrollTo(0, 0);
        }
    }, [vehicleName])

    let [previewImage, setPreviewImage] = useState(false)

    const closeImagePreview = () => {
        setPreviewImage(!previewImage)
    }

    let [bookRideModal, setBookRideModal] = useState(false)

    const closeBookRideModal = () => {
        setBookRideModal(!bookRideModal)
    }

    useEffect(() => {
        if (carInfo.car_name) {
            document.title = `${carInfo.car_name} - Orion Rides`;
        }
    }, [carInfo]);

    return (
        <>
            <AnimatePresence>
                {previewImage && <PreviewImage url={carInfo.image_url} closeImagePreview={closeImagePreview} />}
                {bookRideModal && <BookRide closeBookRideModal={closeBookRideModal} />}
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
                                    {carInfo.customer_ratings?.rating}
                                    {
                                        Array.from({ length: 5 }, (elem, index) => {
                                            let num = index + 0.5
                                            const rating = carInfo.customer_ratings?.rating || 0

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
                                ({carInfo.customer_ratings && carInfo.customer_ratings.rating_count} Customer Ratings)
                            </div>
                        </div>
                        <p>{carInfo.description}</p>
                        <div className="vehicle-info-actions">
                            <h3 className="price">
                                &#8377;{carInfo.price_per_day}<span>/day</span>
                            </h3>
                            <h3 className="discount-message">
                                Book for 7+ Days and Receive a <span>10% Discount!</span>
                            </h3>
                            <button disabled={!carInfo.availability} onClick={() => setBookRideModal(!bookRideModal)}>
                                {carInfo.availability ? "Book A Ride" : "Unavailable"}
                            </button>
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
            </motion.div>
        </>
    )
}

export default VehicleDetails
