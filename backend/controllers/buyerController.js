import Buyer from "../models/buyerModel.js";
import bcrypt from "bcryptjs";

export const registerBuyer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await Buyer.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const buyer = await Buyer.create({ name, email, password: hashed });
    res.json({ message: "Signup successful", buyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginBuyer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const buyer = await Buyer.findOne({ email });
    if (!buyer) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, buyer.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", buyer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
