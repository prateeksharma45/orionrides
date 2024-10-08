import jwt from "jsonwebtoken";

let generateToken = (user) => {
    return jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET
    );
};

export default generateToken;
