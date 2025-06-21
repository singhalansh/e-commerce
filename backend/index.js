import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import DefaultData from "./default.js";
import routes from "./routes/routes.js";
import { v4 as uuid } from "uuid";

dotenv.config({
    path: "./.env",
});

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://e-commerce-uh9v.onrender.com",
            "flipkartcloneansh.vercel.app"
        ],
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

connectDB();

app.use("/api", routes);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

DefaultData();

export const paytmMerchantKey =
    process.env.PAYTM_MERCHANT_KEY || "YOUR_PAYTM_MERCHANT_KEY";
export const paytmparams = {};
paytmparams["MID"] = process.env.PAYTM_MID || "YOUR_PAYTM_MID";
paytmparams["WEBSITE"] = process.env.PAYTM_WEBSITE || "YOUR_PAYTM_WEBSITE";
paytmparams["INDUSTRY_TYPE_ID"] =
    process.env.PAYTM_INDUSTRY_TYPE_ID || "YOUR_PAYTM_INDUSTRY_TYPE_ID";
paytmparams["CALLBACK_URL"] =
    process.env.PAYTM_CALLBACK_URL || "YOUR_PAYTM_CALLBACK_URL";
paytmparams["ORDER_ID"] = uuid();
paytmparams["CUST_ID"] = uuid();
paytmparams["TXN_AMOUNT"] = "1"; // Default amount, can be updated later
paytmparams["CHANNEL_ID"] = "WEB";

// When setting cookies (e.g., in login route), use:
// res.cookie("accessToken", token, {
//   httpOnly: true,
//   secure: true,
//   sameSite: "none"
// });
