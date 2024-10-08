import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    let authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized HTTP, Token not provided!" });
    }

    try {
        let jwtDecoded = jwt.verify(token, process.env.JWT_SECRET);
        let user = await User.findOne({ email: jwtDecoded.email })
            .select("-password")
            .populate({
                path: "cars_rented",
                populate: { path: "car" },
            });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message,
        });
    }
};

export default authMiddleware;
