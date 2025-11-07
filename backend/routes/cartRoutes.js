import express from "express";
import { addToCart, getCart, deleteCartItem } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart); // Add item
router.get("/:userId", getCart); // Get user's cart
router.delete("/:id", deleteCartItem); // Delete item

export default router;
