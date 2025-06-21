import razorpay from "razorpay";
import User from "../models/user.model.js";

export const generateRazorpayOrder = async (req, res) => {
    console.log("Generating Razorpay order...");
    const { amount, currency = "INR" } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
        console.error("Invalid amount provided:", amount);
        return res.status(400).json({ error: "Invalid amount" });
    }
    console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);
    const instance = new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    try {
        const options = {
            amount: amount * 100, // Amount in paise
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await instance.orders.create(options);
        return res.status(200).json({ order });
    } catch (error) {
        console.error("Error creating Razorpay order in controller:", error);
        return res.status(500).json({ error: "Failed to create order" });
    }
};

export const generateCartRazorpayOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate(
            "cart.productId"
        );
        if (!user || !user.cart.length) {
            return res.status(400).json({ error: "Cart is empty" });
        }
        // Calculate total amount
        const amount = user.cart.reduce(
            (sum, item) => sum + item.productId.price.cost * item.quantity,
            0
        );
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Invalid cart amount" });
        }
        const instance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_KEY,
        });
        const options = {
            amount: amount * 100, // in paise
            currency: "INR",
            receipt: `cart_receipt_${Date.now()}`,
        };
        const order = await instance.orders.create(options);
        return res.status(200).json({ order });
    } catch (error) {
        return res.status(500).json({ error: "Failed to create cart order" });
    }
};
