import React, { useState, useEffect } from "react";

const SupplierDashboard = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    discount: "", // 🟢 Added discount field
  });
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // 🔹 Load logged-in supplier info
  useEffect(() => {
    const storedSupplier = localStorage.getItem("supplierInfo");
    if (storedSupplier) {
      const parsed = JSON.parse(storedSupplier);
      setSupplier(parsed.supplier || parsed);
    }
  }, []);

  // 🔹 Fetch supplier's uploaded products
  useEffect(() => {
    if (!supplier?._id) return;
    fetch(`http://localhost:5000/api/products?supplierId=${supplier._id}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [supplier]);

  // 🔹 Input Change Handler
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // 🔹 Upload new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.image) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/products/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, supplierId: supplier?._id }),
      });

      const data = await res.json();

      if (res.ok) {
        setProducts((prev) => [...prev, data]);
        setProduct({
          name: "",
          price: "",
          category: "",
          image: "",
          description: "",
          discount: "", // 🟢 Reset discount
        });
        alert("✅ Product uploaded successfully!");
      } else {
        alert(data.message || "Error uploading product");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error while uploading");
    }
  };

  // 🟠 Edit Product
  const handleEditClick = (prod) => {
    setEditingProduct(prod);
    setProduct({
      name: prod.name,
      price: prod.price,
      category: prod.category,
      image: prod.image,
      description: prod.description,
      discount: prod.discount || "", // 🟢 Load discount value
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🟢 Update Product
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${editingProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? data : p))
        );
        setEditingProduct(null);
        setProduct({
          name: "",
          price: "",
          category: "",
          image: "",
          description: "",
          discount: "", // 🟢 Reset discount
        });
        alert("✅ Product updated successfully!");
      } else {
        alert(data.message || "Error updating product");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error while updating");
    }
  };

  // 🔴 Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        alert("🗑️ Product deleted successfully!");
      } else {
        alert("Error deleting product");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error while deleting");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-5">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
          Supplier Dashboard
        </h2>

        {/* Supplier Info */}
        {supplier && (
          <div className="mb-6 text-center">
            <p className="text-gray-700">
              Welcome,{" "}
              <span className="font-semibold">
                {supplier.email || supplier.emailOrMobile}
              </span>
            </p>
          </div>
        )}

        {/* Upload / Edit Product Form */}
        <form
          onSubmit={editingProduct ? handleUpdate : handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="e.g. Footwear, Electronics"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Paste product image URL"
              required
            />
          </div>

          {/* 🟢 Optional Discount Field */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Optional: e.g. 35"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Write something about the product..."
            ></textarea>
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className={`${
                editingProduct
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-orange-600 hover:bg-orange-700"
              } text-white font-semibold py-2 px-6 rounded-lg transition duration-300`}
            >
              {editingProduct ? "Update Product" : "Upload Product"}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={() => {
                  setEditingProduct(null);
                  setProduct({
                    name: "",
                    price: "",
                    category: "",
                    image: "",
                    description: "",
                    discount: "", // 🟢 Reset discount
                  });
                }}
                className="ml-3 bg-gray-500 text-white py-2 px-5 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Uploaded Products */}
        {products.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Your Uploaded Products
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition relative"
                >
                  {/* 🟢 Discount Label */}
                  {p.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {p.discount}% OFF
                    </span>
                  )}

                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h4 className="text-lg font-bold text-gray-800">{p.name}</h4>
                  <p className="text-orange-600 font-semibold">₹{p.price}</p>
                  <p className="text-sm text-gray-600 mt-2">{p.category}</p>
                  <p className="text-xs text-gray-500 mt-2">{p.description}</p>

                  {/* Edit / Delete Buttons */}
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierDashboard;
