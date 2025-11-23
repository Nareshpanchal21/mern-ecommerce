import React from "react";
import HeroSection from "../components/HeroSection";
import OfferBanner from "../components/OfferBanner";
import CategorySection from "../components/CategorySection";
import ProductsForYou from "../components/ProductsForYou";
import DiscountForYou from "../components/DiscountForYou";
import Footer from "../components/Footer"; // ✅ Footer import

const Home = () => {
  return (
    <>
      <HeroSection />
      <OfferBanner />
      <CategorySection />
      <ProductsForYou />
      <DiscountForYou />
      <Footer /> {/* ✅ Footer added at the bottom */}
    </>
  );
};

export default Home;
