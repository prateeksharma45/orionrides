import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import VehicleSearch from './VehicleSearch';
import VehicleCards from './VehicleCards';
import Footer from './Footer';
import { VehicleContext } from '../contexts/VehicleContext';
import './VehiclePage.css';

const VehiclePage = () => {
    const { carData, getVehicles } = useContext(VehicleContext);
    const [inputVal, setInputVal] = useState({
        search: "",
        sort: "relevance"
    });
    const [noOfCars, setNoOfCars] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleInput = (event) => {
        setInputVal({ ...inputVal, [event.target.name]: event.target.value });
    };

    const handleSort = (event) => {
        setInputVal({ ...inputVal, sort: event.target.value });
    };

    useEffect(() => {
        document.title = 'Browse Our Fleet - Cars for Every Need and Budget';
    }, []);

    useEffect(() => {
        if (carData.length === 0) {
            getVehicles().then(data => {
                setNoOfCars(data.length);
                setIsLoaded(true);
            }).catch(error => {
                console.error('Failed to load vehicles:', error);
            });
        } else {
            setNoOfCars(carData.length);
            setIsLoaded(true);
        }
    }, []);

    return (
        <>
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
                <div className="vehicle-heading">
                    <h2>
                        {noOfCars === 1 ? `${noOfCars} Result` : `${noOfCars} Results`}
                    </h2>
                    <div className="sort">
                        <select name="sort" id="sort" onChange={handleSort} value={inputVal.sort}>
                            <option value="relevance">Price(Relevance)</option>
                            <option value="highest">Price(Highest)</option>
                            <option value="lowest">Price(Lowest)</option>
                        </select>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                </div>
                <div className='vehicles'>
                    {
                        carData && (
                            <VehicleCards
                                cars={carData}
                                searchInput={inputVal.search}
                                sortInput={inputVal.sort}
                                setNoOfCars={setNoOfCars}
                                isLoaded={isLoaded}
                            />
                        )
                    }
                </div>
            </motion.div>
            <Footer />
        </>
    );
};

export default VehiclePage;
