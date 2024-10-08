import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}`);
        console.log("MongoDB Connected Succefully");
    } catch (error) {
        console.log(`MongoDB Connected Succefully: ${error}`);
        process.exit(1);
    }
};

export default connectDB;
