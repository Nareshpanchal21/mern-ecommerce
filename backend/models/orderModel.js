import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer", required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    address: {
      name: String,
      mobile: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
