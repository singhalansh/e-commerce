import { Router } from 'express';
import { usersignup ,userlogin} from '../controllers/user.controller.js';
import { getProductById, getProducts } from '../controllers/product.controller.js';

const router = Router();

router.route("/signup").post(usersignup);
router.route("/login").post(userlogin);
router.route("/products").get(getProducts)
router.route("/product/:id").get(getProductById);
export default router;