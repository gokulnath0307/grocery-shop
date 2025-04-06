const express = require("express");
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");

const CartRouter = express.Router();

CartRouter.post("/add", addToCart);
CartRouter.get("/", getCart);
CartRouter.delete("/remove", removeFromCart);

module.exports = CartRouter;
