import { Router } from "express";
import {
    generateRazorpayOrder,
    generateCartRazorpayOrder,
} from "../controllers/payment.controller.js";
import {
    usersignup,
    userlogin,
    getMyProfile,
    getUserDetails,
    userlogout,
    getCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
} from "../controllers/user.controller.js";
import {
    getProductById,
    getProducts,
} from "../controllers/product.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";
import { verifyRazorpayPayment } from "../controllers/verifyPayment.controller.js";

const router = Router();

router.route("/signup").post(usersignup);
router.route("/login").post(userlogin);
router.route("/products").get(getProducts);
router.route("/product/:id").get(getProductById);
router.route("/getuser/:id").get(verifyJwt, getUserDetails);
router.route("/logout").post(verifyJwt, userlogout);
router.route("/profile").get(verifyJwt, getMyProfile);

// Cart Routes
router.route("/cart").get(verifyJwt, getCart);
router.route("/cart/add").post(verifyJwt, addToCart);
router.route("/cart/remove").post(verifyJwt, removeFromCart);
router.route("/cart/update").post(verifyJwt, updateCartItemQuantity);
router.route("/placeorder").post(verifyJwt, generateRazorpayOrder);
router.route("/verify-payment").post(verifyJwt, verifyRazorpayPayment);
router.route("/cart/pay").post(verifyJwt, generateCartRazorpayOrder);

export default router;
