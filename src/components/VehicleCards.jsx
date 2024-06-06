import { useFetcher, useNavigate } from 'react-router-dom'
import './VehicleCards.css'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const VehicleCards = ({ carData, searchInput, sortInput, setNoOfCars }) => {
    let [cars, setCars] = useState(carData)

    useEffect(() => {
        if (searchInput == "") {
            setCars(carData)
        }
        else {
            setCars(() => (
                carData.filter((oldCar) => (
                    oldCar.car_name.toLowerCase().includes(searchInput.trim().toLowerCase())
                ))
            ))
        }
    }, [searchInput])

    useEffect(() => {
        const sortedCars = [...cars]
        if (sortInput === "lowest") {
            sortedCars.sort((a, b) => a.price_per_day - b.price_per_day)
        } else if (sortInput === "highest") {
            sortedCars.sort((a, b) => b.price_per_day - a.price_per_day)
        } else if (sortInput === "relevance") {
            sortedCars.sort((a, b) => a.id - b.id)
        }
        setCars(sortedCars)
    }, [sortInput])

    useEffect(() => {
        setNoOfCars(cars.length)
    }, [cars])

    let navigate = useNavigate()
    let detailBtnHandler = (index) => {
        cars.forEach((car, id) => {
            if (id == index) {
                navigate(`/vehicles/${car.car_name.replaceAll(" ", "-").toLowerCase()}`)
            }
        });
    }
    return (
        <>
            {
                cars.map((car, index) => (
                    <motion.div
                        layoutId={`car-image-${car.id}`}
                        key={car.id} className='vehicle'>
                        <img src={car.image_url} alt={car.car_name} loading='lazy' />
                        <div className="vehicle-name">
                            <h1>{car.car_name}</h1>
                        </div>
                        <div className="vehicle-actions">
                            <h3 className="price">
                                &#8377;{car.price_per_day}<span>/day</span>
                            </h3>
                            <button disabled={!car.availability} onClick={() => detailBtnHandler(index)}>
                                {car.availability ? "Check Details" : "Unavailable"}
                            </button>
                        </div>
                    </motion.div>
                ))
            }
        </>
    )
}

export default VehicleCards
