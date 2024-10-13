import express from "express"

import authMiddlerware from "../middleware/auth.js";
import { listOrder, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderControllers.js";

const orderRouter=express.Router();

orderRouter.post("/place",authMiddlerware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddlerware,userOrders);
orderRouter.get("/list",listOrder);
orderRouter.post("/status",updateStatus);

export default orderRouter;

