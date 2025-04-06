// Checkout.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import catchFunction from "../common/catchFunction";
import { getCartSliceData, useLazyGetAllUserCartDataQuery } from "../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { useSaveOrderProductsMutation } from "../redux/slices/orderSlice";
import toast from "react-hot-toast";

const TAX_RATE = 10.0;

export default function Checkout() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("usertoken");
  const [getAllCartDataApi] = useLazyGetAllUserCartDataQuery();
  const { cartProduct } = useSelector(getCartSliceData);

  useEffect(() => {
    if (isLoggedIn) {
      getCartAllData();
    } else {
      navigate(-1);
    }
  }, [isLoggedIn]);

  const getCartAllData = async () => {
    try {
      await getAllCartDataApi().unwrap();
    } catch (error) {
      catchFunction(error);
    }
  };

  // Subtotal based on quantity
  const subtotal = cartProduct.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = (subtotal + TAX_RATE).toFixed(2);

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    address: "",
    city: "",
    region: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [saveOrderProductApi] = useSaveOrderProductsMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "cardNumber":
        errorMsg = /^\d{16}$/.test(value.replace(/\s/g, "")) ? "" : "Enter 16-digit card number";
        break;
      case "expiryDate":
        errorMsg = /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? "" : "Use MM/YY format";
        break;
      case "cvc":
        errorMsg = /^\d{3,4}$/.test(value) ? "" : "3 or 4 digit CVC";
        break;
      default:
        if (!value.trim()) errorMsg = "Required";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (!formData[key]) {
        validationErrors[key] = "This field is required";
      }
    });

    if (Object.values(validationErrors).some((err) => err !== "")) {
      setErrors(validationErrors);
      return;
    }

    try {
      await saveOrderProductApi({
        ...formData,
        products: cartProduct.map((item) => ({
          product: item._id,
          price: item.price,
          quantity: item.quantity || 1,
        })),
      }).unwrap();

      toast.success("Order placed successfully!");
      setFormData({
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        address: "",
        city: "",
        region: "",
        pincode: "",
      });
      setErrors({});
      navigate("/order-history");
    } catch (error) {
      catchFunction(error);
    }
  };

  return (
    <>
      <h2 className="text-4xl font-semibold underline py-10 text-center">Grocery Checkout</h2>
      <main className="lg:flex lg:min-h-full lg:flex-row-reverse">
        <section className="hidden w-full max-w-3xl flex-col bg-gray-50 lg:flex mx-auto">
          <h2 className="sr-only">Order summary</h2>
          <ul className="flex-auto divide-y divide-gray-200 px-6 overflow-y-auto">
            {cartProduct.map((product) => (
              <li key={product._id} className="flex space-x-6 py-6">
                <img src={product.image} alt={product.title} className="size-32 rounded-md object-cover" />
                <div className="flex flex-col justify-between">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm">Qty: {product.quantity}</p>
                  <p className="text-sm">Price: ₹{product.price}</p>
                  <p className="font-medium">Total: ₹{product.price * product.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 p-6 text-sm">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>₹{TAX_RATE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
              {[
                { label: "Name on card", name: "cardName" },
                { label: "Card number", name: "cardNumber", maxLength: 16 },
                { label: "Expiration date (MM/YY)", name: "expiryDate", maxLength: 5 },
                { label: "CVC", name: "cvc", maxLength: 4 },
                { label: "Address", name: "address" },
                { label: "City", name: "city" },
                { label: "Region", name: "region" },
                { label: "Pincode", name: "pincode" },
              ].map(({ label, name, maxLength }) => (
                <div key={name} className="col-span-full sm:col-span-6">
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    maxLength={maxLength}
                    className="block w-full rounded-md px-3 py-2 text-base border border-gray-300 focus:outline-indigo-600"
                  />
                  {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                </div>
              ))}

              <button
                type="submit"
                className="col-span-full mt-4 w-full rounded-md bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700"
              >
                Pay ₹{total}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
