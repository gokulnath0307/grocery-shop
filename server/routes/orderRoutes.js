const express = require("express");
const { placeOrder, getOrders, getSoldProducts } = require("../controllers/orderController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");

const OrderRouter = express.Router();

OrderRouter.post("/checkout", authenticate, placeOrder);
OrderRouter.get("/history", authenticate, getOrders);
OrderRouter.get("/soldproduct", authenticate, authorizeRoles, getSoldProducts);

module.exports = OrderRouter;
