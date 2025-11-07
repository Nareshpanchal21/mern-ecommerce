import express from "express";
import { createOrder, getOrdersByBuyer, cancelOrder } from "../controllers/orderController.js";

const router = express.Router();

// 🔹 Create new order
router.post("/", createOrder);

// 🔹 Get all orders for a buyer
router.get("/:buyerId", getOrdersByBuyer);

// 🔹 Cancel/Delete order permanently
router.delete("/cancel/:id", cancelOrder);

export default router;
