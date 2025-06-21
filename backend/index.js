import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";
import DefaultData from "./default.js";
import routes from "./routes/routes.js";
import {v4 as uuid} from "uuid";
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

export const paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY || "YOUR_PAYTM_MERCHANT_KEY";
export const paytmparams= {}
paytmparams["MID"] = process.env.PAYTM_MID || "YOUR_PAYTM_MID";
paytmparams["WEBSITE"] = process.env.PAYTM_WEBSITE || "YOUR_PAYTM_WEBSITE";
paytmparams["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID || "YOUR_PAYTM_INDUSTRY_TYPE_ID";
paytmparams["CALLBACK_URL"] = process.env.PAYTM_CALLBACK_URL || "YOUR_PAYTM_CALLBACK_URL";
paytmparams["ORDER_ID"] = uuid();
paytmparams["CUST_ID"] = uuid();
paytmparams["TXN_AMOUNT"] = "1"; // Default amount, can be updated later
paytmparams["CHANNEL_ID"] = "WEB";
