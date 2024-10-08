import { createContext, useState } from 'react';

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
    const [carData, setCarData] = useState([]);

    const getVehicles = async () => {
        if (carData.length === 0) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/vehicles`);
                const data = await response.json();
                setCarData(data);
                return data;
            } catch (error) {
                console.error('Error fetching cars: ', error);
                throw error;
            }
        } else {
            return carData;
        }
    };

    return (
        <VehicleContext.Provider value={{ carData, getVehicles }}>
            {children}
        </VehicleContext.Provider>
    );
};
