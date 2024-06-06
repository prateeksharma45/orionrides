import VehicleCards from './VehicleCards'
import './VehiclePage.css'
import carData from '../data/carData.json'
import { useEffect, useState } from 'react'
import VehicleSearch from './VehicleSearch'
import { motion } from 'framer-motion'

const VehiclePage = () => {
    let [inputVal, setInputVal] = useState({
        search: "",
        sort: "relevance"
    })

    const handleInput = (event) => {
        setInputVal({ ...inputVal, [event.target.name]: event.target.value })
    }

    const handleSort = (event) => {
        setInputVal({ ...inputVal, sort: event.target.value })
    }

    let [noOfCars, setNoOfCars] = useState(carData.length)

    useEffect(() => {
        document.title = 'Browse Our Fleet - Cars for Every Need and Budget';
    }, []);

    return (
        <motion.div
            initial={{ y: "2rem", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "2rem", opacity: 0 }}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
            className='vehicle-page'>
            <div className="vehicle-search-section">
                <VehicleSearch inputVal={inputVal} handleInput={handleInput} value={inputVal.sort} />
            </div>
            <div className='vehicles'>
                <div className="vehicle-heading">
                    <h2>
                        {
                            noOfCars == carData.length ? "All Vehicles" : noOfCars == 1 ? `${noOfCars} Result` : `${noOfCars} Results`
                        }
                    </h2>
                    <div className="sort">
                        <select name="sort" id="sort" onChange={handleSort}>
                            <option value="relevance">Price(Relevance)</option>
                            <option value="highest">Price(Highest)</option>
                            <option value="lowest">Price(Lowest)</option>
                        </select>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                </div>
                <VehicleCards carData={carData} searchInput={inputVal.search} sortInput={inputVal.sort} setNoOfCars={setNoOfCars} />
            </div>
        </motion.div>
    )
}

export default VehiclePage
