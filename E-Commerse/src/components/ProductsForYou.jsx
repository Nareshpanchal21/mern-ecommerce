import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductsForYou = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        // 🔹 Filter products with discount = 0 or empty
        const normalProducts = data.filter(p => !p.discount || p.discount === 0);
        setProducts(normalProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-orange-600 text-center mb-10">
        🛍️ Products For You
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No products available yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300 overflow-hidden"
            >
              <div className="h-48 sm:h-56 md:h-60 w-full bg-white flex justify-center items-center overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-contain p-3"
                />
              </div>

              <div className="p-4 flex flex-col justify-between h-[150px] sm:h-[160px]">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                    {p.name}
                  </h3>
                  <p className="text-orange-600 font-bold mt-1 text-sm sm:text-base">
                    ₹{p.price}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {p.category}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-medium py-1.5 px-4 rounded-lg transition text-sm sm:text-base"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsForYou;
