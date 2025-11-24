import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get } from "../services/api"; // ✅ Use api.js

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const data = await get(`/products/category/${category}`);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching category products:", err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 mb-6"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {decodeURIComponent(category)} Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg p-4 text-center hover:scale-105 duration-300 cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-orange-500 font-bold mt-1">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
