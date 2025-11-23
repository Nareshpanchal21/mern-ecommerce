import React from "react";
import banner from "../assets/banner.png"; // apni banner image import karo

const HeroSection = () => {
  return (
    <section className="w-full bg-gray-50 py-10 px-6 md:px-16 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
      {/* Left Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-snug">
          Discover the Best Deals Online
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-2">
          Shop your favorite products at unbeatable prices.
        </p>
        <p className="text-gray-600 text-base sm:text-lg mb-4">
          Fast delivery, easy returns, and amazing offers every day.
        </p>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition text-sm sm:text-base">
          Shop Now
        </button>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src={banner}
          alt="Shop Banner"
          className="w-[95%] sm:w-[80%] md:w-[90%] h-auto rounded-lg shadow-md object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
