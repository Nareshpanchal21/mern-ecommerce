import Supplier from "../models/supplierModel.js";
import Product from "../models/ProductModel.js"; // ✅ new
import bcrypt from "bcryptjs";

// ✅ Register Supplier
export const registerSupplier = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existingUser = await Supplier.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const supplier = await Supplier.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration successful",
      supplier,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Login Supplier
export const loginSupplier = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    const supplier = await Supplier.findOne({
      $or: [{ email }, { mobile }],
    });

    if (!supplier) {
      return res.status(400).json({ message: "Invalid email or mobile number" });
    }

    const isMatch = await bcrypt.compare(password, supplier.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      supplier,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Upload Product
export const uploadProduct = async (req, res) => {
  try {
    const { supplierId, name, price, category, image, description } = req.body;

    if (!supplierId || !name || !price || !image) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = await Product.create({
      supplierId,
      name,
      price,
      category,
      image,
      description,
    });

    res.status(201).json({
      message: "Product uploaded successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ message: "Server error while uploading" });
  }
};
