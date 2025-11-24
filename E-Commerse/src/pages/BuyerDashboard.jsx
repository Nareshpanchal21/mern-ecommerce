import React, { useContext, useEffect, useState } from "react";
import { BuyerContext } from "../context/BuyerContext";
import { useNavigate } from "react-router-dom";
import { get, post, del } from "../services/api"; // ✅ centralized api.js

const BuyerDashboard = () => {
  const { buyer, logoutBuyer } = useContext(BuyerContext);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  // 🟢 Load buyer data
  useEffect(() => {
    if (!buyer) {
      navigate("/");
    } else {
      fetchAllData();
    }
  }, [buyer, navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([fetchAddresses(), fetchOrders()]);
    setLoading(false);
  };

  // 🟢 Fetch Addresses
  const fetchAddresses = async () => {
    try {
      const res = await get(`/address/${buyer._id}`);
      setAddresses(res);
    } catch (error) {
      console.error("❌ Error fetching addresses:", error);
    }
  };

  // 🟢 Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await get(`/orders/${buyer._id}`);
      setOrders(res);
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
    }
  };

  // 🟢 Cancel (Delete) Order — remove instantly from UI
  const cancelOrder = async (orderId) => {
    try {
      const res = await del(`/orders/cancel/${orderId}`);
      alert(res.message || "✅ Order cancelled successfully!");
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("❌ Error cancelling order:", error);
      alert("Failed to cancel order");
    }
  };

  // 🟢 Handle Address Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData, userId: buyer._id };
      const res = await post("/address/add", dataToSend);
      alert(res.message || "Address added!");
      setShowForm(false);
      setFormData({ name: "", mobile: "", street: "", city: "", state: "", pincode: "" });
      fetchAddresses();
    } catch (error) {
      console.error("❌ Error adding address:", error);
      alert("Failed to add address");
    }
  };

  const handleLogout = () => {
    logoutBuyer();
    navigate("/");
  };

  if (!buyer) return null;
  if (loading)
    return (
      <div className="text-center text-gray-500 mt-20">
        Loading your dashboard...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">
        Welcome, {buyer.name || "Buyer"} 👋
      </h2>

      {/* Profile + Address */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Profile */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2">Profile Info</h3>
          <p>Email: {buyer.email}</p>
        </div>

        {/* Address */}
        <div className="p-4 border rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2">My Address</h3>
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
          >
            Add Address
          </button>

          {addresses.length > 0 && (
            <ul className="mt-3 text-gray-700">
              {addresses.map((addr, idx) => (
                <li key={idx} className="border-b py-1">
                  {addr.name}, {addr.street}, {addr.city} ({addr.pincode})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 🛍️ My Orders */}
      <div className="mt-6 p-4 border rounded-lg shadow-sm">
        <h3 className="font-semibold text-gray-700 mb-3">My Orders</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map((order) => (
              <li
                key={order._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="text-sm text-gray-700">
                    <strong>Product:</strong> {order.productName}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Price:</strong> ₹{order.price}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong>Status:</strong> {order.status}
                  </p>
                </div>
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>

      {/* 🟢 Address Form Popup */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">Add Address</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {["name", "mobile", "street", "city", "state", "pincode"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              ))}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
