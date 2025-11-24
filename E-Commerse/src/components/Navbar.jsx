// src/components/Navbar.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SupplierContext } from "../context/SupplierContext";
import { BuyerContext } from "../context/BuyerContext";
import { post, getRenderURL } from "../services/api"; // ✅ Render ready

const Navbar = () => {
  const { supplier, logout: logoutSupplier } = useContext(SupplierContext);
  const { buyer, loginBuyer, logoutBuyer } = useContext(BuyerContext);

  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (buyer) logoutBuyer();
    if (supplier) logoutSupplier();
    setShowMenu(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = isSignup ? e.target.name?.value : null;

    try {
      // ✅ Remove /api from endpoint, getRenderURL() already includes /api
      const endpoint = isSignup ? "buyer/register" : "buyer/login"; 
      const payload = isSignup ? { name, email, password } : { email, password };

      console.log("API Call:", getRenderURL() + "/" + endpoint, payload);

      const data = await post(endpoint, payload);

      if (data.buyer) loginBuyer(data.buyer);

      alert(data.message || "Success");
      setShowAuthModal(false);
    } catch (err) {
      console.error("Auth error:", err);
      alert(err.message || "Something went wrong. Check server routes.");
    }
  };

  return (
    <>
      <nav className="flex flex-wrap justify-between items-center px-4 py-3 bg-white shadow-md sticky top-0 z-50">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-2xl font-bold cursor-pointer"
        >
          <i className="fa-solid fa-bag-shopping text-orange-500"></i>
          <span className="text-black">ShopMe</span>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex items-center w-full sm:w-2/5 mt-3 sm:mt-0 order-last sm:order-none"
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-l-full outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-r-full hover:bg-orange-600"
          >
            <i className="fa fa-search"></i>
          </button>
        </form>

        <div className="flex items-center gap-4">
          {!supplier && !buyer && (
            <>
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-gray-700 text-sm sm:text-base hover:text-orange-500"
              >
                Login / Signup
              </button>
              <Link
                to="/supplier"
                className="text-gray-700 text-sm sm:text-base hover:text-orange-500 block"
              >
                Become a Supplier
              </Link>
            </>
          )}

          {supplier && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-700 text-lg hover:text-orange-500"
              >
                <i className="fa fa-user"></i>
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-3 z-50">
                  <p className="text-sm text-gray-700 mb-2 border-b pb-2">
                    <strong>{supplier.email}</strong>
                  </p>
                  <Link
                    to="/supplier-dashboard"
                    className="block text-sm text-gray-700 hover:text-orange-500 mb-2"
                    onClick={() => setShowMenu(false)}
                  >
                    Upload Product
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-sm text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {buyer && !supplier && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-700 text-lg hover:text-orange-500"
              >
                <i className="fa fa-user"></i>
              </button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-3 z-50">
                  <p className="text-sm text-gray-700 mb-2 border-b pb-2">
                    <strong>{buyer.email}</strong>
                  </p>
                  <Link
                    to="/buyer-dashboard"
                    className="block text-sm text-gray-700 hover:text-orange-500 mb-2"
                    onClick={() => setShowMenu(false)}
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-sm text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <Link
            to="/cart"
            className="text-gray-700 text-lg hover:text-orange-500 relative"
          >
            <i className="fa fa-shopping-cart"></i>
          </Link>
        </div>
      </nav>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000] px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>

            <h2 className="text-2xl font-semibold text-center text-orange-500 mb-4">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>

            <form onSubmit={handleAuth} className="flex flex-col gap-3">
              {isSignup && (
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  required
                  className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
                />
              )}
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-orange-400"
              />

              <button
                type="submit"
                className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 mt-2"
              >
                {isSignup ? "Signup" : "Login"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-3">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsSignup(false)}
                    className="text-orange-500 font-medium cursor-pointer"
                  >
                    Login
                  </span>
                </>
              ) : (
                <>
                  New here?{" "}
                  <span
                    onClick={() => setIsSignup(true)}
                    className="text-orange-500 font-medium cursor-pointer"
                  >
                    Signup
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
