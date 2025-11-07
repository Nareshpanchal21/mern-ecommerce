import express from "express";
import {
  uploadProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import Product from "../models/ProductModel.js";

const router = express.Router();

// 🟢 Upload new product
router.post("/upload", uploadProduct);

// 🟢 Get all products
router.get("/", getProducts);

// 🆕 Search products by keyword (name, category, or description)
router.get("/search/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword.toLowerCase().trim();
    console.log("🔍 Search keyword:", keyword);

    // Flexible regex search in name, category, or description
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: `No products found for "${keyword}"` });
    }

    res.json(products);
  } catch (error) {
    console.error("❌ Error in search route:", error);
    res.status(500).json({ message: "Server error while searching products" });
  }
});

// 🆕 Get products by category (handles similar names)
router.get("/category/:category", async (req, res) => {
  try {
    let { category } = req.params;
    const formatted = category.toLowerCase().trim();
    console.log("Requested category:", formatted);

    let filter = {};

    if (formatted.includes("men")) {
      filter = { category: { $regex: /men|menswear|mens wear|men wear|mens/i } };
    } 
    else if (formatted.includes("ethnic") || formatted.includes("ethanic")) {
      filter = { category: { $regex: /ethnic wear|ethnic|ethanic/i } };
    } 
    else if (formatted.includes("women") || formatted.includes("lady") || formatted.includes("female")) {
      filter = { category: { $regex: /women|womenswear|ladies wear|female/i } };
    } 
    else {
      filter = { category: { $regex: formatted, $options: "i" } };
    }

    const products = await Product.find(filter);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: `No products found for "${category}"` });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Server error while fetching category products" });
  }
});

// 🆕 Get single product by ID
router.get("/:id", getProductById);

// 🟠 Update product
router.put("/:id", updateProduct);

// 🔴 Delete product
router.delete("/:id", deleteProduct);

export default router;
