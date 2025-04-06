
const { getAllProducts, getProductById } = require("../controllers/productController");

const UserRouter = require("express").Router();
UserRouter.get("/product", getAllProducts);
UserRouter.get("/product/:id", getProductById);
module.exports = UserRouter;
