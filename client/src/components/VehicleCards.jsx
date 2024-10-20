import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './VehicleCards.css'
import { useNavigate } from 'react-router-dom'

const VehicleCards = ({ cars, searchInput, sortInput, setNoOfCars, isLoaded }) => {
    let [filteredCars, setFilteredCars] = useState([]);

    useEffect(() => {
        let result = [...cars];

        if (searchInput.trim() !== "") {
            result = result.filter((car) =>
                car.car_name.toLowerCase().includes(searchInput.trim().toLowerCase())
            );
        }

        if (sortInput === "lowest") {
            result.sort((a, b) => a.price_per_day - b.price_per_day);
        } else if (sortInput === "highest") {
            result.sort((a, b) => b.price_per_day - a.price_per_day);
        } else if (sortInput === "relevance") {
            result.sort((a, b) => a.id - b.id);
        }

        setFilteredCars(result);
        setNoOfCars(result.length);
    }, [searchInput, sortInput, cars, setNoOfCars]);

    const navigate = useNavigate();
    const detailBtnHandler = (index) => {
        navigate(`/vehicles/${filteredCars[index]._id}`);
    };

    return (
        <>
            {
                isLoaded ? (
                    filteredCars.length > 0 ? (
                        filteredCars.map((car, index) => (
                            <motion.div
                                layoutId={`car-image-${car._id}`}
                                key={car._id}
                                className='vehicle'>
                                <img src={`${car.image_url}?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} alt={car.car_name} loading='lazy' />
                                <div className="vehicle-name">
                                    <h3>{car.brand_name}</h3>
                                    <h1>{car.car_name}</h1>
                                </div>
                                <div className="vehicle-actions">
                                    <h3 className="price">
                                        &#8377;{car.price_per_day}<span>/day</span>
                                    </h3>
                                    <button onClick={() => detailBtnHandler(index)}>
                                        Check Details
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="vehicle-search-response">
                            <div className='vehicle-search-response-icon'>
                                <i className="fa-solid fa-exclamation"></i>
                            </div>
                            <p>No cars found!</p>
                        </div >
                    )
                ) : (
                    <>
                        <div className='vehicle-skeleton'></div>
                        <div className='vehicle-skeleton'></div>
                        <div className='vehicle-skeleton'></div>
                    </>
                )
            }
        </>
    );
};

export default VehicleCards;
