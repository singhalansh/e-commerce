import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";
import DefaultData from "./default.js";
import routes from "./routes/routes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(
    cors({
        origin: "http://localhost:5173", // or your frontend URL
        credentials: true,
    })
);

dotenv.config({
    path: "./.env",
});
connectDB();
app.use("/api", routes);
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

DefaultData();
