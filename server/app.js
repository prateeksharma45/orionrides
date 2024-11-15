import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import indexRouter from "./routes/index.route.js";
import vehicleRouter from "./routes/vehicle.route.js";

const app = express();

app.use(cors());
app.use(
    cors({
        origin: [process.env.CORS_ORIGIN],
        methods: ["GET, POST, PUT, DELETE, PATCH, HEAD"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/vehicles", vehicleRouter);

export default app;
