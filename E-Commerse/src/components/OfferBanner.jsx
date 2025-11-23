import React from "react";
import banner from "../assets/ShopMe.png";

const OfferBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 rounded-2xl shadow-xl overflow-hidden p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
      
      {/* Image Section */}
      <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center md:justify-start">
        <div className="bg-white p-4 rounded-2xl shadow-lg">
          <img
            src={banner}
            alt="Shop Banner"
            className="w-full object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Text & USP Section */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-5">
        <h1 className="text-gray-900 text-3xl md:text-5xl font-extrabold font-serif drop-shadow-md">
          Why Choose ShopMe?
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-md">
          Premium quality products, fast delivery, and amazing service — every time.
        </p>

        {/* USP Cards */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
          <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-gray-800 text-sm w-32">
            <span className="text-3xl mb-1">💵</span>
            Cash on Delivery
          </div>
          <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-gray-800 text-sm w-32">
            <span className="text-3xl mb-1">⏰</span>
            On-time Delivery
          </div>
          <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 text-gray-800 text-sm w-32">
            <span className="text-3xl mb-1">🏆</span>
            Best Products
          </div>
        </div>

        <button className="mt-5 bg-gray-900 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition shadow-lg">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default OfferBanner;
