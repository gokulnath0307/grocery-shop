import { useState, useEffect, useRef } from "react";
import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const userMenuRef = useRef(null); // Ref for the user menu

  // Load authentication state on mount
  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    setIsLoggedIn(!!token);
    setUsername(localStorage.getItem("username") || "-");
  }, []);

  const handleAuthClick = () => {
    if (!isLoggedIn) {
      navigate("/user-login");
    } else {
      localStorage.clear();
      setIsLoggedIn(false);
      setUsername("-");
      navigate("/");
    }
  };

  // Close user menu if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <header className="bg-white shadow-md relative">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2">
            <FiMenu className="text-2xl text-gray-700" />
          </button>

          {/* Logo */}
          <button onClick={() => navigate("/")} className="text-xl font-bold text-green-700">
          Grocery Shop
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-gray-700 hover:text-gray-900"
            >
              Home
            </button>
            <button onClick={() => navigate("/product")} className="text-gray-700 hover:text-gray-900">
              Product
            </button>
          </nav>

          {/* Icons Section */}
          <div className="flex space-x-4">
            {/* Cart */}
            {/* <div className="relative">
              <button onClick={() => navigate("/cart-product")} className="relative p-2 text-gray-700">
                <FiShoppingCart className="text-2xl" />
              </button>
            </div> */}

            {/* User Profile */}
            <div className="relative cursor-pointer" ref={userMenuRef}>
              <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="p-2 text-gray-700 cursor-pointer">
                <FiUser className="text-2xl" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4 z-50">
                  <h3 className="text-lg font-semibold border-b pb-2">Hi {username}</h3>
                  <ul className="divide-y mt-2">
                    <li className="py-2 cursor-pointer">
                      <button onClick={() => navigate("/order-history")} className="text-gray-800 hover:text-indigo-600 cursor-pointer">
                        Order History
                      </button>
                    </li>
                    <li className="py-2">
                      <button
                        onClick={handleAuthClick}
                        className={`cursor-pointer sm:text-center ${!isLoggedIn ? "text-blue-400 border" : "text-red-600 hover:text-red-800"}`}
                      >
                        {!isLoggedIn ? "Login" : "Logout"}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay (Closes when clicked outside) */}
      {isSidebarOpen && <div className="fixed inset-0 z-40 bg-gray-500 bg-opacity-50" onClick={() => setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 w-64 h-full bg-white shadow-md transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <AiOutlineClose className="text-2xl text-gray-700" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-5 space-y-4">
          <button onClick={() => navigate("/")} className="block text-gray-700 hover:text-gray-900">
            Home
          </button>
          <button onClick={() => navigate("/product")} className="block text-gray-700 hover:text-gray-900">
            Product
          </button>
        </nav>

        {/* Auth Button */}
        <div
          onClick={handleAuthClick}
          className={`cursor-pointer sm:text-center p-2 mt-4 ${
            !isLoggedIn ? "text-blue-400 border border-2" : "text-red-600 hover:text-red-800"
          }`}
        >
          {!isLoggedIn ? "Login" : "Logout"}
        </div>
      </aside>
    </header>
  );
}
