import Order from "../models/orderModel.js";

// 🟢 Create new order
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// 🟢 Get orders for a buyer
export const getOrdersByBuyer = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.params.buyerId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// 🟢 Cancel (Delete) an order
export const cancelOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order cancelled and deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling order", error });
  }
};
