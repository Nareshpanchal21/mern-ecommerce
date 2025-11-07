import express from "express";
import { addAddress, getUserAddress } from "../controllers/addressController.js";

const router = express.Router();

router.post("/add", addAddress);
router.get("/:userId", getUserAddress);

export default router;
