import React from "react";
import { FaShoppingBag } from "react-icons/fa"; // ✅ Correct icon import

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 text-center">
      <div className="flex items-center justify-center gap-2 text-2xl font-bold mb-2">
        <FaShoppingBag className="text-orange-500" /> {/* ✅ Working icon */}
        <span className="text-white">ShopMe</span>
      </div>
      <p className="text-sm text-gray-400">
        © 2025 ShopMe. All rights reserved.
      </p>
      <p className="text-gray-400 text-sm mt-2">
        Best E-commerce platform for your needs. Contact us at:  
        <br />
        <span className="font-medium text-white">Naresh Panchal</span> |  
        📞 8668809685 | ✉️ nareshpanchal@gmail.com
      </p>
    </footer>
  );
};

export default Footer;
