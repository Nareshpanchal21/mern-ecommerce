import express from "express";
import dotenv from "dotenv";
import cors from "cors";          // ✅ Add this line
import connectDB from "./config/db.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import buyerRoutes from "./routes/buyerRoute.js";
import addressRoutes from "./routes/addressRoute.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());                  // ✅ Enable CORS
app.use(express.json());

// ✅ Routes
app.use("/api/supplier", supplierRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/buyer", buyerRoutes);

app.use("/api/address", addressRoutes);

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
