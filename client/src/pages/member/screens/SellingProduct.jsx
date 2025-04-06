import { useSelector } from "react-redux";
import { getOrderSliceData, useLazyGetAllSoldOrderProductQuery } from "../../../redux/slices/orderSlice";
import { useEffect } from "react";
import catchFunction from "../../../common/catchFunction";

export default function SellingProduct() {
  const [getAllUserOrderProductApi] = useLazyGetAllSoldOrderProductQuery();
  const { soldOrderData } = useSelector(getOrderSliceData);
  console.log(soldOrderData);
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
      <div className="mx-auto max-w-8xl px-4 py- ">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Selling Product</h1>
        </div>

        <div className="mt-16">
          <div className="space-y-20">
            <table className="mt-4 w-full text-gray-500 sm:mt-6">
              <caption className="sr-only">Products</caption>
              <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                <tr>
                  <th scope="col" className="py-3 pr-8 font-semibold text-lg sm:table-cell">
                    Product
                  </th>
                  <th scope="col" className=" py-3 pr-8 font-semibold text-lg sm:table-cell">
                    Price
                  </th>
                  <th scope="col" className=" py-3 pr-8 font-semibold text-lg sm:table-cell">
                    Order Number
                  </th>
                  <th scope="col" className=" py-3 pr-8 font-semibold text-lg sm:table-cell">
                    Order Date
                  </th>
                  <th scope="col" className=" py-3 pr-8 font-semibold text-lg sm:table-cell">
                    Buyer Name
                  </th>
                  <th scope="col" className=" py-3 pr-8 font-semibold text-lg sm:table-cell">
                    Buyer Email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                {soldOrderData.length
                  ? soldOrderData.map((product) => (
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
                        <td className="hidden py-6 pr-8 sm:table-cell ">{product.buyer.name}</td>
                        <td className="hidden py-6 pr-8 sm:table-cell ">{product.buyer.email}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
            {!soldOrderData.length ? <div className="flex justify-center text-2xl">"NO DATA" </div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
