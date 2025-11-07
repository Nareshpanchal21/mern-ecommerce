import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

// 🟢 Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, userType } = req.body;

    if (!userId || !productId || !userType) {
      return res.status(400).json({
        message: "Missing required fields: userId, userType, or productId",
      });
    }

    // ✅ Check if product exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Check if product already in cart for same userType
    const existingItem = await Cart.findOne({ userId, productId, userType });
    if (existingItem) {
      existingItem.quantity += quantity ? Number(quantity) : 1;
      await existingItem.save();
      return res
        .status(200)
        .json({ message: "Quantity updated", item: existingItem });
    }

    // ✅ Create new cart item
    const newItem = await Cart.create({
      userId,
      userType, // 🆕 added this field to separate buyer/supplier carts
      productId,
      quantity: quantity ? Number(quantity) : 1,
    });

    res.status(201).json({ message: "Item added to cart", item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while adding to cart" });
  }
};

// 🟠 Get User Cart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userType } = req.query; // 👈 get user type from query

    if (!userId || !userType) {
      return res
        .status(400)
        .json({ message: "Missing userId or userType in request" });
    }

    // ✅ Filter cart by userType also
    const cartItems = await Cart.find({ userId, userType }).populate("productId");
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart items" });
  }
};

// 🔴 Delete Item
export const deleteCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting cart item" });
  }
};
