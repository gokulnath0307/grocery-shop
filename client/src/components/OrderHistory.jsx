import { useEffect } from "react";
import { getOrderSliceData, useLazyGetAllUserOrderProductQuery } from "../redux/slices/orderSlice";
import catchFunction from "../common/catchFunction";
import { useSelector } from "react-redux";

export default function OrderHistory() {
  const [getAllUserOrderProductApi] = useLazyGetAllUserOrderProductQuery();
  const { orderData } = useSelector(getOrderSliceData);
  useEffect(() => {
    getAllUserOrderProductData();
  }, []);
  const getAllUserOrderProductData = async () => {
    try {
      await getAllUserOrderProductApi().unwrap();
    } catch (error) {
      catchFunction(error);
    }
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
          <p className="mt-2 text-sm text-gray-500">Check the status of recent orders, manage returns, and download invoices.</p>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>

          <div className="space-y-20">
            <table className="mt-4 w-full text-gray-500 sm:mt-6">
              <caption className="sr-only">Products</caption>
              <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                <tr>
                  <th scope="col" className="py-3 pr-8 font-semibold text-lg sm:w-2/5 lg:w-1/3">
                    Product
                  </th>
                  <th scope="col" className="hidden w-1/5 py-3 pr-8 font-semibold text-lg sm:table-cell">
                    Price
                  </th>
                  <th scope="col" className="hidden py-3 pr-8 font-semibold text-lg sm:table-cell">
                    Order Number
                  </th>
                  <th scope="col" className="hidden py-3 pr-8 font-semibold text-lg sm:table-cell">
                    Order Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                {orderData.length &&
                  orderData.map((product) => (
                    <tr key={product.id}>
                      <td className="py-6 pr-8">
                        <div className="flex items-center">
                          <img alt={product.name} src={product.image} className="mr-6 size-16 rounded-sm object-cover" />
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="mt-1 sm:hidden">{product.price}</div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-6 pr-8 sm:table-cell">{product.price}</td>
                      <td className="hidden py-6 pr-8 sm:table-cell">{product.orderId}</td>
                      <td className="hidden py-6 pr-8 sm:table-cell ">{product.createdAt}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
