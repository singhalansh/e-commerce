import { Router } from "express";
import {
    usersignup,
    userlogin,
    getMyProfile,
} from "../controllers/user.controller.js";
import {
    getProductById,
    getProducts,
} from "../controllers/product.controller.js";
import { getUserDetails, userlogout } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";
const router = Router();

router.route("/signup").post(usersignup);
router.route("/login").post(userlogin);
router.route("/products").get(getProducts);
router.route("/product/:id").get(getProductById);
router.route("/getuser/:id").get(verifyJwt, getUserDetails);
router.route("/logout").post(verifyJwt, userlogout);
router.route("/profile").get(verifyJwt, getMyProfile);
export default router;
