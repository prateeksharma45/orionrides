import Car from "../models/car.model.js";

const listVehicles = async (req, res) => {
    try {
        let vehicles = await Car.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getVehicle = async (req, res) => {
    try {
        let { id } = req.params;
        let vehicle = await Car.findById(id);
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export { listVehicles, getVehicle };
