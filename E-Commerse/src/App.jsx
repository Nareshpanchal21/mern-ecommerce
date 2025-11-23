import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SupplierForm from "./pages/SupplierForm";
import SupplierRegister from "./pages/SupplierRegister";
import SupplierDashboard from "./pages/SupplierDashboard";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CategoryProducts from "./pages/CategoryProducts";
import SearchResults from "./pages/SearchResults";
import OrderForm from "./pages/OrderForm";
import BuyerDashboard from "./pages/BuyerDashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/supplier" element={<SupplierForm />} />
        <Route path="/supplier-register" element={<SupplierRegister />} />
        <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
      </Routes>
    </>
  );
}

export default App;
