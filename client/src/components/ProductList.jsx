import React, { useEffect } from "react";
import { getProductSliceData, useLazyGetAllProductsQuery } from "../redux/slices/productSlice";
import { useSelector } from "react-redux";
import catchFunction from "../common/catchFunction";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [getAllProductDataApi] = useLazyGetAllProductsQuery();
  const { productTableData } = useSelector(getProductSliceData);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProductData();
  }, []);

  const getAllProductData = async () => {
    try {
      await getAllProductDataApi().unwrap();
    } catch (error) {
      catchFunction(error);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-4xl sm:text-5xl text-center font-bold text-gray-900 mb-12">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productTableData?.length > 0 ? (
            productTableData.slice(0, 4).map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product-details/${product._id}`)}
                className="cursor-pointer group bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
              >
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.name || "Product"}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{product.quantity} kg</p>
                  <p className="text-md font-bold text-blue-600 mt-2">&#8377; {product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg col-span-full">No products available</p>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/product")}
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Browse All Products
          </button>
        </div>
      </div>
    </div>
  );
}
