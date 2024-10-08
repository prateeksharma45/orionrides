import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

const getUser = async (req, res) => {
    try {
        let user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve user information.",
            error: error.message,
        });
    }
};

const registerUser = async (req, res) => {
    try {
        let { name, email, password, avatar } = req.body;
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    res.send(err.message);
                } else {
                    let newUser = new User({
                        name: name,
                        email: email,
                        password: hash,
                        avatar: avatar,
                    });
                    await newUser.save();

                    let token = generateToken(newUser);

                    res.status(201).json({
                        message: "User created succefully",
                        token: token,
                    });
                }
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user!", error: error });
    }
};

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Incorrect email or password!" });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                let token = generateToken(user);
                res.status(200).json({
                    message: "Login Successful!",
                    token: token,
                });
            } else {
                res.status(400).json({
                    message: "Incorrect email or password!",
                });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user!", error: error });
    }
};

export { getUser, registerUser, loginUser };
