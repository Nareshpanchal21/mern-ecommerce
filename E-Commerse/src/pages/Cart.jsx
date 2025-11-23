import React, { useEffect, useState, useContext } from "react";
import { SupplierContext } from "../context/SupplierContext";
import { BuyerContext } from "../context/BuyerContext"; // ✅ Added
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { supplier } = useContext(SupplierContext);
  const { buyer } = useContext(BuyerContext); // ✅ Added buyer context

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Detect userId and userType properly
    const userId = buyer?._id || supplier?._id || null;
    const userType = buyer ? "buyer" : supplier ? "supplier" : null;

    if (!userId || !userType) {
      console.error("❌ No user ID or userType found for fetching cart");
      setLoading(false);
      return;
    }

    // ✅ Fetch cart with userType query
    fetch(`http://localhost:5000/api/cart/${userId}?userType=${userType}`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to fetch cart");
        }
        return res.json();
      })
      .then((data) => {
        setCartItems(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err.message);
        setCartItems([]);
      })
      .finally(() => setLoading(false));
  }, [buyer, supplier]);

  // 🧹 Remove item
  const handleRemove = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" });
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // 🔄 Go to product detail
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 py-20 text-lg">
        Loading cart...
      </p>
    );

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (acc, item) =>
          acc + (item?.productId?.price || 0) * (item?.quantity || 1),
        0
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-3 py-6 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-5">
        🛒 Your Cart
      </h1>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            Your cart is empty!
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-5 transition-transform duration-200 hover:scale-[1.02]"
            >
              <img
                src={item?.productId?.image}
                alt={item?.productId?.name}
                onClick={() => handleProductClick(item?.productId?._id)}
                className="w-full sm:w-36 h-48 sm:h-40 object-contain rounded-lg bg-gray-50 cursor-pointer"
              />

              <div className="flex flex-col sm:flex-1 sm:ml-5 text-center sm:text-left">
                <h2
                  onClick={() => handleProductClick(item?.productId?._id)}
                  className="text-base sm:text-lg font-semibold text-gray-800 mb-1 cursor-pointer hover:text-orange-500"
                >
                  {item?.productId?.name}
                </h2>
                <p className="text-orange-500 font-bold text-sm sm:text-base mb-1">
                  ₹{item?.productId?.price}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Quantity: {item?.quantity}
                </p>

                <button
                  onClick={() => handleRemove(item._id)}
                  className="mt-3 text-red-500 hover:text-red-600 text-sm font-medium self-center sm:self-start"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="w-full max-w-3xl mt-6 p-4 bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row justify-between items-center gap-3 sticky bottom-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 text-center sm:text-left">
            Total:{" "}
            <span className="text-orange-500 font-bold">₹{totalPrice}</span>
          </h2>
          <button className="bg-orange-500 text-white px-5 py-2 w-full sm:w-auto rounded-full hover:bg-orange-600 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
