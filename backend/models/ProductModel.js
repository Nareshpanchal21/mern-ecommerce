import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    image: { type: String, required: true },
    description: { type: String },
    discount: { type: Number, default: 0 }, // 🟢 Added discount field
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
