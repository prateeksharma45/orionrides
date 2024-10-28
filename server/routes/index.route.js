import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import Car from "../models/car.model.js";
import RentedCar from "../models/rentedcars.model.js";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("This is the index route!");
});

router.post("/book-ride/:car_id", authMiddleware, async (req, res) => {
    try {
        let user = req.user;
        let { car_id } = req.params;
        let {
            name,
            age,
            email,
            phone_no,
            address,
            pincode,
            pick_up_date,
            drop_off_date,
        } = req.body;

        const pickUpDate = new Date(pick_up_date);
        const dropOffDate = new Date(drop_off_date);

        if (isNaN(pickUpDate) || isNaN(dropOffDate)) {
            return res.status(400).json({ message: "Invalid dates provided" });
        }

        if (pickUpDate < new Date() || dropOffDate <= pickUpDate) {
            return res.status(400).json({
                message:
                    "Pick-up date must be in the future, and drop-off date must be after the pick-up date.",
            });
        }

        let car = await Car.findOneAndUpdate(
            { _id: car_id, availability: true },
            { current_owner: user._id, availability: false },
            { new: true }
        );

        if (!car) {
            return res.status(404).json({
                message: "Car not available or not found!",
            });
        }

        const rentalDuration = Math.ceil(
            (dropOffDate - pickUpDate) / (1000 * 60 * 60 * 24)
        );
        const totalPrice = rentalDuration * car.price_per_day;

        let rentedCar = new RentedCar({
            owner: user._id,
            car: car_id,
            name: name,
            age: age,
            email: email,
            phone_no: phone_no,
            address: address,
            pincode: pincode,
            total_price: totalPrice,
            pick_up_date: pickUpDate,
            drop_off_date: dropOffDate,
            rental_duration: rentalDuration,
        });

        await rentedCar.save();

        user.cars_rented.push(rentedCar._id);
        await user.save();

        res.json({
            message: "Car booked successfully!",
            car,
            rentedCar,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Error renting car!",
            error: error.message,
        });
    }
});

router.post("/cancel-ride/:car_id", authMiddleware, async (req, res) => {
    try {
        let user = req.user;
        let { car_id } = req.params;

        let car = await Car.findOneAndUpdate(
            { _id: car_id },
            { current_owner: null, availability: true },
            { new: true }
        );

        if (!car) {
            return res.status(404).json({
                message: "Car not found!",
            });
        }

        let rentedCar = await RentedCar.findOneAndDelete({
            owner: user._id,
            car: car_id,
        });

        user.cars_rented = user.cars_rented.filter(
            (val) => val.toString() !== rentedCar._id.toString()
        );
        await user.save();

        res.json({
            message: "Car rental cancelled successfully!",
            car,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Error cancelling car rental!",
            error: error.message,
        });
    }
});

router.get("/cancel-expired-rentals", async (req, res) => {
    console.log("Running a task to cancel expired rentals");
    try {
        const now = new Date().toISOString();
        const expiredRentals = await RentedCar.find({
            drop_off_date: { $lt: now },
        });

        for (let rental of expiredRentals) {
            await Car.findByIdAndUpdate(rental.car, {
                availability: true,
                current_owner: null,
            });

            await RentedCar.findByIdAndDelete(rental._id);

            let user = await User.findById(rental.owner);
            user.cars_rented = user.cars_rented.filter(
                (val) => val.toString() !== rental._id.toString()
            );
            await user.save();

            console.log(`Rental ${rental._id} has been cancelled.`);
        }

        return res.status(200).json({
            message: "Expired rentals have been cancelled successfully!",
        });
    } catch (error) {
        console.error("Error in canceling expired rentals:", error);
        return res.status(500).json({
            message: "Error cancelling expired rentals",
            error: error.message,
        });
    }
});

export default router;
