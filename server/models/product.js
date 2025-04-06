const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Item name (e.g., Apples)
    price: { type: Number, required: true }, // Can be negative
    quantity: { type: Number, required: true }, // Can be negative
    category: { type: String, required: true }, // fruits, vegetables, etc.
    image: { type: String, required: true }, // Base64 or URL
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Optional: if you're associating a user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
