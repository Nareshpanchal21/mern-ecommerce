import Product from "../models/ProductModel.js";

// 🟢 Upload new product
export const uploadProduct = async (req, res) => {
  try {
    const { supplierId, name, price, category, image, description, discount } = req.body;

    if (!supplierId || !name || !price || !image) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newProduct = await Product.create({
      supplier: supplierId,
      name,
      price,
      category,
      image,
      description,
      discount: discount || 0, // 🟢 default 0
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error while uploading product" });
  }
};

// 🟢 Get all products (filter by supplier)
export const getProducts = async (req, res) => {
  try {
    const { supplierId } = req.query;
    let products;
    if (supplierId) {
      products = await Product.find({ supplier: supplierId }).populate("supplier", "name email");
    } else {
      products = await Product.find().populate("supplier", "name email");
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// 🆕 Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("supplier", "name email");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 🟠 Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// 🔴 Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
