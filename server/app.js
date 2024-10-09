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
        origin: "*",
        methods: ["GET, POST, PUT, DELETE, PATCH, HEAD"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/vehicles", vehicleRouter);

app.get("/api/avatars", (req, res) => {
    const avatars = [
        "avatars/avatar1.png",
        "avatars/avatar2.png",
        "avatars/avatar3.png",
        "avatars/avatar4.png",
        "avatars/avatar5.png",
        "avatars/avatar6.png",
    ];
    res.json(avatars);
});

export default app;
