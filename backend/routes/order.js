import express from "express";
import { isAuthenticatedUser,authorizeRoles } from "../middleware/auth.js";
import { newOrder } from "../controllers/orderController.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

export default router;
