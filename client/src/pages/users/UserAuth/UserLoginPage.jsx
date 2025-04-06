import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";
import catchFunction from "../../../common/catchFunction";
import { IoEye, IoEyeOff } from "react-icons/io5";

export const UserLoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginApi] = useLoginMutation();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validation = () => {
    let newErrors = {};
    if (!values.email?.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) newErrors.email = "Invalid email format";

    if (!values.password?.trim()) newErrors.password = "Password is required";
    else if (values.password?.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validation()) {
      try {
        const payload = { ...values };
        await loginApi(payload).unwrap();
        toast.success("Login Successful");
        navigate(-1);
      } catch (error) {
        catchFunction(error);
      }
    }
  };

  return (
    <div className="relative">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="absolute  object-cover w-full h-full"
        alt="Grocery Background"
      />

      {/* Dark Overlay */}
      <div className="relative bg-opacity-50">
        <svg className="absolute inset-x-0 bottom-0 text-white" viewBox="0 0 1160 163">
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>

        <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            {/* Left Side (Text for Shoppers) */}
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Fresh Groceries, Delivered to Your Doorstep
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-300 md:text-lg">
                Log in to shop from a wide selection of fresh fruits, veggies, pantry staples, and daily essentials. Fast delivery. Great prices.
              </p>
              <a
                href="/shop"
                className="inline-flex items-center font-semibold tracking-wider transition duration-200 text-teal-300 hover:text-teal-500"
              >
                Start Shopping
                <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>

            {/* Right Side (Login Form) */}
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded-lg shadow-xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold text-gray-800 sm:text-center sm:mb-6 sm:text-2xl">Welcome Back to GroceryEase</h3>
                <div class="mx-auto max-w-lg lg:pt-2">
                  <button
                    type="button"
                    aria-label="Sign in with Google"
                    class="flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-white py-2 text-black shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    <span class="text-sm font-medium">Sign in with Google</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                      <path
                        fill="#fbc02d"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                      <path
                        fill="#e53935"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      ></path>
                      <path
                        fill="#4caf50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      ></path>
                      <path
                        fill="#1565c0"
                        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      ></path>
                    </svg>
                  </button>

                  <div class="relative mt-4">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                      <div class="w-full border-t border-gray-200"></div>
                    </div>
                    <div class="relative flex justify-center">
                      <span class="bg-white px-4 text-sm font-medium text-gray-500">or</span>
                    </div>
                  </div>
                </div>

                <form>
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      placeholder="Enter Email"
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={values.email || ""}
                      onChange={handleChangeInput}
                      className="w-full h-12 px-4 bg-white border border-gray-300 rounded shadow-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                    {errors.email && <span className="text-sm text-red-400">{errors.email}</span>}
                  </div>

                  <div className="relative mb-4">
                    <div className="absolute right-4 top-10 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
                    </div>
                    <label className="block text-gray-700">Password</label>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      value={values.password || ""}
                      onChange={handleChangeInput}
                      required
                      className="w-full h-12 px-4 bg-white border border-gray-300 rounded shadow-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                    {errors.password && <span className="text-sm text-red-400">{errors.password}</span>}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <a href="/forgot-password" className="text-sm text-green-600 hover:underline">
                      Forgot Password?
                    </a>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="w-full h-12 px-6 font-medium text-white transition bg-green-500 rounded shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
                    >
                      Sign In & Start Saving
                    </button>
                    <p className="mt-3 text-xs text-gray-500 text-center">Trusted by 10,000+ households for daily grocery needs.</p>
                  </div>

                  <p className="mt-4 text-sm text-gray-600 sm:text-center">
                    New to GroceryEase?{" "}
                    <a href="/user-register" className="text-green-600 hover:underline">
                      Create an account
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
