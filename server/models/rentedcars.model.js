import mongoose from "mongoose";

const rentedCarSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car",
        },
        name: {
            type: String,
            required: true,
            trim: true,
            // index: true,
        },
        age: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: false,
            // index: true,
        },
        phone_no: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true,
        },
        total_price: {
            type: Number,
            required: true,
        },
        rented_on: {
            type: Date,
            default: Date.now,
        },
        pick_up_date: {
            type: Date,
            required: true,
        },
        drop_off_date: {
            type: Date,
            required: true,
        },
        rental_duration: {
            type: Number,
        },
    },
    { timestamps: true }
);

const RentedCar = mongoose.model("RentedCar", rentedCarSchema);

export default RentedCar;
