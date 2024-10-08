import mongoose from "mongoose";

const carSchema = mongoose.Schema(
    {
        brand_name: {
            type: String,
            required: true,
        },
        car_name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
        price_per_day: Number,
        car_type: {
            type: String,
            required: true,
        },
        seating_capacity: Number,
        availability: Boolean,
        model_year: Number,
        customer_ratings: Number,
        average: Number,
        transmission: String,
        engine: String,
        fuel_type: String,
        location: {
            type: String,
            trim: true,
        },
        current_owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
