const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    shippingDetails: {
      city: { type: String, required: true },
      region: { type: String, required: true }, // New field
      pincode: { type: String, required: true }, // New field
      address: { type: String, required: true },
    },
    paymentDetails: {
      cardName: { type: String, required: true },
      cardNumber: { type: String, required: true }, // For sample use only
      expiryDate: { type: String, required: true },
      cvc: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
