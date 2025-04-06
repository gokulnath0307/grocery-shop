const Order = require("../models/order");
const Cart = require("../models/cart");

exports.placeOrder = async (req, res) => {
  try {
    const { products, cardName, cardNumber, expiryDate, cvc, city, region, pincode, address } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products in the order" });
    }

    const totalAmount = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const order = new Order({
      user: req.userId,
      products,
      totalAmount,
      shippingDetails: { city, region, pincode, address },
      paymentDetails: { cardName, cardNumber, expiryDate, cvc },
    });

    await order.save();
    await Cart.updateOne({ user: req.userId }, { $pull: { products: { product: { $in: products.map((p) => p.product) } } } });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    // Fetch all orders for the user, sorted by most recent
    const orders = await Order.find({ user: req.userId })
      .populate("products.product") // Populate product details
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Transform orders to return products separately with orderId and createdAt
    const productList = orders.flatMap((order) =>
      order.products.map((item) => ({
        orderId: order._id, // Order ID at top level
        createdAt: new Date(order.createdAt).toLocaleDateString("en-GB"),
        productId: item.product._id, // Product ID
        name: item.product.title, // Product Name
        price: item.product.price, // Product Price
        quantity: item.quantity, // Quantity ordered
        image: item.product.image,
      }))
    );

    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSoldProducts = async (req, res) => {
  try {
    const sellerId = req.userId; // Assuming the seller is authenticated

    // Find orders that include products created by the seller
    const orders = await Order.find()
      .populate({
        path: "products.product",
        match: { user: sellerId }, // Filter products by seller (user field in Product)
      })
      .populate("user", "name email") // Populate buyer info
      .sort({ createdAt: -1 });

    // Filter out orders where no matching products exist for the seller
    const soldProducts = orders.flatMap((order) =>
      order.products
        .filter((item) => item.product) // Ensure product exists (after match)
        .map((item) => ({
          orderId: order._id,
          createdAt: new Date(order.createdAt).toLocaleDateString("en-GB"),
          buyer: {
            id: order.user._id,
            name: order.user.name,
            email: order.user.email,
          },
          productId: item.product._id,
          title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        }))
    );

    if (soldProducts.length === 0) {
      return res.status(404).json({ message: "No products sold yet" });
    }

    res.status(200).json(soldProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
