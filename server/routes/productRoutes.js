const express = require("express");
const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByUser,
} = require("../controllers/productController");

const ProductRouter = express.Router();

// API Endpoints
ProductRouter.post("/create", createProduct);
ProductRouter.get("/", getProductsByUser);
ProductRouter.get("/:id", getProductById);
ProductRouter.get("/user/:userId", getProductsByUser); // ✅ Get products by user
ProductRouter.put("/update/:id", updateProduct);
ProductRouter.delete("/delete/:id", deleteProduct);

module.exports = ProductRouter;
