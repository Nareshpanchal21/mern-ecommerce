import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { get, getRenderURL } from "../services/api"; // ✅ centralized api.js

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const endpoint = `/products/search/${query}`;
        console.log("Fetching search results from:", getRenderURL() + endpoint);
        const data = await get(endpoint);
        if (!data || data.length === 0) {
          setError(`No products found for "${query}"`);
          setResults([]);
        } else {
          setResults(data);
          setError("");
        }
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading)
    return (
      <p className="text-center mt-10 text-lg font-medium text-gray-700">
        Loading...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10 text-lg font-semibold">
        {error}
      </p>
    );

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
        Search Results for "{decodeURIComponent(query)}"
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((product) => (
          <div
            key={product?._id}
            className="border rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden bg-white"
          >
            {/* Desktop */}
            <div className="hidden sm:block">
              <div className="flex items-center justify-center bg-gray-100">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-full md:w-1/2 h-96 object-contain rounded-xl bg-white p-4"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product?.name || "Unnamed Product"}
                </h3>
                <p className="text-gray-600 font-medium">₹{product?.price || 0}</p>
                <p className="text-sm text-gray-500">{product?.category || "N/A"}</p>
                <Link
                  to={`/product/${product?._id}`}
                  className="mt-2 inline-block text-orange-500 font-medium hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex sm:hidden items-center p-3">
              <div className="w-28 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="ml-4 flex flex-col justify-between flex-grow">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                  {product?.name || "Unnamed Product"}
                </h3>
                <p className="text-sm text-gray-500">{product?.category || "N/A"}</p>
                <p className="text-orange-600 font-bold text-base mt-1">
                  ₹{product?.price || 0}
                </p>
                <Link
                  to={`/product/${product?._id}`}
                  className="text-sm text-orange-500 mt-1 hover:underline font-medium self-start"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
