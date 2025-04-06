import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"; // Corrected import
import UserPage from "./UserPage";
import ShoppingCart from "../../components/ShoppingCart";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Checkout from "../../components/Checkout";
import { UserLoginPage } from "./UserAuth/UserLoginPage";
import { UserRegisterPage } from "./UserAuth/UserRegisterPage";
import AllProductList from "../../components/AllProductList";
import ProductDetails from "../../components/ProductDetails";
import { useSelector } from "react-redux";
import { authSliceData } from "../../redux/slices/authSlice";
import OrderHistory from "../../components/OrderHistory";

export default function UserRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="cart-product" element={<ShoppingCart />} />
        <Route path="checkout-product" element={<ProtectedCheckout />} />
        <Route path="product" element={<AllProductList />} />
        <Route path="product-details/:productId" element={<ProductDetails />} />
        <Route path="user-login" element={<UserLoginPage />} />
        <Route path="user-register" element={<UserRegisterPage />} />
        <Route path="order-history" element={<OrderHistory />} />
      </Routes>
      <Footer />
    </>
  );
}

const ProtectedCheckout = () => {
  const { usertoken } = useSelector(authSliceData);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = usertoken;
    if (!isLoggedIn) {
      localStorage.clear();
      navigate("/user-login", { replace: true });
    }
  }, [navigate]);

  return <Checkout />;
};
