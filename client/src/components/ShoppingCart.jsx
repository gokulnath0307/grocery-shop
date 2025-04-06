import { FaChevronDown, FaQuestionCircle, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCartSliceData,
  updateQuantity,
  removeFromCart,
  useDeleteCartItemMutation,
  useUpdateCartDataMutation,
  useClearCartMutation,
  useCreateCartDataMutation,
} from "../redux/slices/cartSlice";
import toast from "react-hot-toast";
import catchFunction from "../common/catchFunction";

export default function ShoppingCart() {
  const taxPrice = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = !!localStorage.getItem("usertoken");
  const { cartProduct } = useSelector(getCartSliceData);

  const [deleteCartItem] = useDeleteCartItemMutation();
  const [addCartItem] = useCreateCartDataMutation();
  const [updateCartData] = useUpdateCartDataMutation();

  // Handle quantity change
  const handleQuantityChange = async (productId, quantity) => {
    quantity = parseInt(quantity);
    if (isLoggedIn) {
      try {
        await updateCartData({ productId, quantity }).unwrap();
        toast.success("Quantity updated");
      } catch (error) {
        catchFunction(error);
      }
    } else {
      dispatch(updateQuantity({ productId, quantity }));
      toast.success("Quantity updated");
    }
  };

  const handleRemoveItem = async (productId) => {
    if (isLoggedIn) {
      try {
        await deleteCartItem(productId).unwrap();
        toast.success("Item removed from your grocery cart 🛒");
      } catch (error) {
        catchFunction(error);
      }
    } else {
      dispatch(removeFromCart(productId));
      toast.success("Item removed from your grocery cart 🛒");
    }
  };

  const handleShippingCart = async () => {
    if (isLoggedIn) {
      try {
        let sendata = cartProduct.map((v) => ({ ...v, quantity: v.quantity || 1 }));
        await addCartItem(sendata).unwrap();
        toast.success("Product added to your cart 🧺");
        navigate("/checkout-product");
      } catch (error) {
        catchFunction(error);
      }
    } else {
      toast("Please log in to save your groceries!", { icon: "🥦", duration: 2000 });
      setTimeout(() => navigate("/user-login"), 2500);
    }
  };

  const subtotal = cartProduct.reduce((acc, curr) => acc + parseFloat(curr.price) * (curr.quantity || 1), 0);
  const total = subtotal + taxPrice;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">🛒 Your Grocery Cart</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          {/* Cart Items */}
          <section className="lg:col-span-7">
            {cartProduct.length === 0 ? (
              <p className="text-center text-gray-500 py-10">
                Your cart is empty 🧺.{" "}
                <a href="/product" className="text-green-600 hover:underline">
                  Shop now
                </a>
              </p>
            ) : (
              <ul className="divide-y border-t border-b border-gray-200">
                {cartProduct.map((product) => (
                  <li key={product._id} className="flex py-6 sm:py-10">
                    <img src={product.image} alt={product.name} className="size-24 rounded-md object-cover sm:size-48" />
                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="mt-1 text-sm font-medium text-gray-900">&#8377; {product.price}</p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          {/* Quantity Selector */}
                          <div className="relative w-full max-w-16">
                            <select
                              value={product.quantity || 1}
                              onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                              className="rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 border border-gray-300 focus:outline-green-600 sm:text-sm"
                            >
                              {[...Array(8)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                            <FaChevronDown className="absolute right-2 top-2 text-gray-500" />
                          </div>
                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(product._id)}
                            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <FaTimes className="size-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Order Summary */}
          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <dl className="mt-6 space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <dt>Subtotal</dt>
                <dd className="font-medium text-gray-900">&#8377; {subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-sm text-gray-600">
                <dt className="flex items-center">
                  Tax estimate
                  <FaQuestionCircle className="ml-2 text-gray-400" />
                </dt>
                <dd className="font-medium text-gray-900">&#8377; {taxPrice}</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-medium text-gray-900">
                <dt>Order total</dt>
                <dd>&#8377; {total.toFixed(2)}</dd>
              </div>
            </dl>
            {/* Checkout Button */}
            <button
              onClick={handleShippingCart}
              className="mt-6 w-full rounded-md bg-green-600 px-4 py-3 text-white font-medium shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500"
            >
              Checkout
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
