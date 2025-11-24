import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SupplierContext } from "../context/SupplierContext";
import { BuyerContext } from "../context/BuyerContext";
import { get, post, getRenderURL } from "../services/api"; // ✅ centralized api.js

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { supplier } = useContext(SupplierContext);
  const { buyer } = useContext(BuyerContext);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");

  // ✅ Fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const endpoint = `/products/${id}`;
        console.log("Fetching product from:", getRenderURL() + endpoint);
        const data = await get(endpoint);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err.message);
        setMessage("❌ Failed to load product.");
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Add to Cart
  const handleAddToCart = async () => {
    if (!product) return;

    const userId = supplier?._id || buyer?._id;
    const userType = supplier ? "supplier" : buyer ? "buyer" : null;

    if (!userId || !userType) {
      setMessage("⚠️ Please login first before adding to cart.");
      return;
    }

    try {
      const endpoint = "/cart/add";
      console.log("Adding to cart via:", getRenderURL() + endpoint);

      const data = await post(endpoint, {
        userId,
        userType,
        productId: product._id,
        quantity: Number(qty),
      });

      setMessage(data.message || "✅ Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      setMessage("❌ Something went wrong while adding to cart.");
    }
  };

  if (!product)
    return <p className="text-center py-20 text-gray-500">Loading product...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 mb-6"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row bg-white p-6 rounded-2xl shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-contain rounded-xl bg-white p-4"
        />

        <div className="flex-1 md:ml-8 mt-6 md:mt-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
          <p className="text-orange-600 font-bold text-xl mb-4">₹{product.price}</p>
          <p className="text-gray-600 mb-6">{product.description || "No description available."}</p>

          <div className="flex items-center gap-3 mb-6">
            <label className="text-gray-700 font-semibold">Quantity:</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="border border-gray-400 rounded-md w-20 p-2"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={() => navigate("/order", { state: { product, quantity: qty } })}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              💰 Buy Now
            </button>
          </div>

          {message && (
            <p
              className={`mt-4 text-center font-semibold ${
                message.startsWith("✅")
                  ? "text-green-600"
                  : message.startsWith("⚠️")
                  ? "text-yellow-600"
                  : "text-red-600"
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

export default ProductDetail;
