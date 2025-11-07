import express from "express";
import {
  registerSupplier,
  loginSupplier,
  uploadProduct, // ✅ new controller
} from "../controllers/supplierController.js";

const router = express.Router();

// Supplier Auth Routes
router.post("/register", registerSupplier);
router.post("/login", loginSupplier);

// ✅ Product Upload Route
router.post("/upload-product", uploadProduct);

export default router;
