import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Ethnic Wear", img: "https://images.meesho.com/images/marketing/1744634654837.webp" },
  { name: "Western Dresses", img: "https://images.meesho.com/images/marketing/1744634725496.webp" },
  { name: "Menswear", img: "https://images.meesho.com/images/marketing/1744634780426.webp" },
  { name: "Footwear", img: "https://images.meesho.com/images/marketing/1744634814643.webp" },
  { name: "Home Decor", img: "https://images.meesho.com/images/marketing/1744634835018.webp" },
  { name: "Beauty", img: "https://images.meesho.com/images/marketing/1744634871107.webp" },
  { name: "Accessories", img: "https://images.meesho.com/images/marketing/1744634909968.webp" },
];

const CategorySection = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="relative py-8 bg-white">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Categories
      </h2>

      {/* Mobile scroll buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-md hover:bg-orange-600 block md:hidden"
      >
        ❮
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-full shadow-md hover:bg-orange-600 block md:hidden"
      >
        ❯
      </button>

      <div
        ref={scrollRef}
        className="flex gap-5 px-6 overflow-x-auto md:overflow-x-hidden scroll-smooth no-scrollbar md:flex-wrap md:justify-center"
      >
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat.name)}
            className="flex-shrink-0 bg-white rounded-xl shadow-lg hover:scale-105 duration-300 text-center w-36 sm:w-44 md:w-48 cursor-pointer"
          >
            <div className="rounded-t-xl overflow-hidden">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-40 object-cover"
              />
            </div>
            <h3 className="py-3 text-lg font-medium text-gray-800">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
