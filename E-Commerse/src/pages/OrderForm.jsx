import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { get, post } from "../services/api"; // ✅ centralized api.js
import logo from "../assets/ShopMe.png";
import { BuyerContext } from "../context/BuyerContext";

const OrderForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { buyer } = useContext(BuyerContext);
  const product = location.state?.product;
  const quantity = location.state?.quantity || 1;
  const total = product ? product.price * quantity : 0;

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "COD",
  });

  const [message, setMessage] = useState("");

  // 🟢 Fetch buyer address from backend (auto-fill)
  useEffect(() => {
    const fetchAddress = async () => {
      if (!buyer) return;
      try {
        const res = await get(`/address/${buyer._id}`);
        if (res.length > 0) {
          const addr = res[0];
          setForm({
            name: addr.name,
            address: `${addr.street}, ${addr.city}, ${addr.state}, ${addr.pincode}`,
            phone: addr.mobile,
            payment: "COD",
          });
        }
      } catch (error) {
        console.log("Error fetching address:", error);
      }
    };
    fetchAddress();
  }, [buyer]);

  // 🟠 Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🟢 Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.phone) {
      setMessage("❌ Please fill all details");
      return;
    }

    try {
      await post("/orders", {
        buyerId: buyer._id,
        productName: product.name,
        price: total,
        address: {
          name: form.name,
          mobile: form.phone,
          street: form.address,
        },
        status: "Pending",
      });

      setMessage("✅ Order placed successfully!");
      setTimeout(() => navigate("/buyer-dashboard"), 1500);
    } catch (error) {
      console.error("Order error:", error);
      setMessage("❌ Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* 🔸 Left Side — Product Details */}
        <div className="md:w-1/2 bg-gradient-to-br from-orange-400 to-orange-500 text-white p-6 flex flex-col justify-center items-center">
          {product ? (
            <div className="w-full text-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-48 h-48 mx-auto object-contain bg-white rounded-xl p-3 shadow-lg"
              />
              <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
              <p className="text-sm italic text-orange-100 mt-1">
                Category: {product.category}
              </p>
              <p className="mt-3 text-base leading-relaxed text-orange-50 px-3">
                {product.description || "No description available."}
              </p>
              <div className="bg-white/20 rounded-xl p-3 mt-5 inline-block">
                <p className="text-lg font-semibold">
                  ₹{product.price} × {quantity} ={" "}
                  <span className="text-white font-bold">₹{total}</span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-lg">No product selected</p>
          )}
        </div>

        {/* 🔹 Right Side — Order Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="ShopMe Logo"
              className="w-32 sm:w-40 object-contain drop-shadow-lg"
            />
          </div>

          <h2 className="text-3xl font-bold text-orange-600 mb-4 text-center">
            Place Your Order
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="border border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              className="border border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>

            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={handleChange}
              className="border border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            {/* Payment */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <label className="font-medium text-gray-700">
                Payment Method:
              </label>
              <select
                name="payment"
                value={form.payment}
                onChange={handleChange}
                className="border border-orange-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-md hover:shadow-lg font-semibold"
            >
              Confirm Order
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center font-semibold ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
