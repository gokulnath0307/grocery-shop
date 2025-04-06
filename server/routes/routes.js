const { register, login } = require("../controllers/authController");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");
const CartRouter = require("./cartRoutes");
const OrderRouter = require("./orderRoutes");
const ProductRouter = require("./productRoutes");
const UserRouter = require("./userRoutes");

const Router = require("express").Router();
Router.post("/register", register);
Router.post("/login", login);

Router.use("/user", UserRouter);
Router.use("/cart", authenticate, CartRouter);
Router.use("/order",  OrderRouter);
Router.use("/product", authenticate, authorizeRoles, ProductRouter);
module.exports = Router;
