const Product = require("../models/product");
const Order = require("../models/order"); // Capitalize to match model naming convention

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      user: req.user._id,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("user", "name email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products by Logged-in User
exports.getProductsByUser = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, user: req.user._id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updatedData = {
      ...req.body,
      image: req.body.image || product.image, // Keep existing image if not updated
    };

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product (if not in an order)
exports.deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const product = await Product.findOne({ _id: productId, user: req.user._id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingOrder = await Order.findOne({ "products.product": productId });
    if (existingOrder) {
      return res.status(400).json({ message: "This product has been purchased and cannot be deleted." });
    }

    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
