import crypto from "crypto";
import User from "../models/user.model.js";

export const verifyRazorpayPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        fromCart,
    } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Missing payment verification fields",
            });
    }
    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(sign.toString())
            .digest("hex");
        if (expectedSignature === razorpay_signature) {
            // Only clear the user's cart if payment was for the cart
            if (fromCart && req.user && req.user._id) {
                await User.findByIdAndUpdate(req.user._id, {
                    $set: { cart: [] },
                });
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: "Payment verified successfully",
                });
        } else {
            return res
                .status(400)
                .json({ success: false, message: "Invalid payment signature" });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Error verifying payment" });
    }
};
