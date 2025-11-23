import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SupplierContext } from "../context/SupplierContext"; // ✅ import context

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(SupplierContext); // ✅ use context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/supplier/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        login(data); // ✅ this updates context + localStorage
        navigate("/"); // redirect to home
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      alert("Error connecting to server");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Supplier Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition duration-300"
          >
            Login
          </button>

          <p className="text-center text-gray-600 text-sm mt-4">
            Don’t have an account?{" "}
            <Link
              to="/supplier-register"
              className="text-orange-600 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;
