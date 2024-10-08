import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

dotenv.config();

const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`The app is listening on port ${port}`);
        });
    })
    .catch((err) => console.log(err));
