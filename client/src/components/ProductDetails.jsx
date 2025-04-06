import { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyGetOneProductByIDQuery } from "../redux/slices/productSlice";
import { useDispatch } from "react-redux";
import { setCartProduct } from "../redux/slices/cartSlice";

const reviews = { average: 4, totalCount: 256 };

export default function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [fetchProduct, { data: product, isLoading, isError }] = useLazyGetOneProductByIDQuery();

  useEffect(() => {
    if (!productId || productId === "undefined" || productId.trim() === "") {
      navigate("/gallery", { replace: true });
    } else {
      fetchProduct(productId);
    }
  }, [productId, fetchProduct, navigate]);

  if (isLoading) return <div className="text-center py-10">Loading artwork details...</div>;
  if (isError || !product) return <div className="text-center py-10 text-red-500">Artwork not found!</div>;

  const handleAddProductToCart = () => {
    dispatch(setCartProduct({ ...product }));
    navigate("/cart-product");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 grid lg:grid-cols-2 gap-x-8">
        <div className="lg:max-w-lg ">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{product.name}</h1>

          <section aria-labelledby="product-info" className="mt-4">
            <p className="text-2xl text-gray-900">&#8377; {product.price}</p>

            <div className="mt-2 flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} className={`h-5 w-5 ${reviews.average > i ? "text-yellow-400" : "text-gray-300"}`} />
              ))}
              <span className="text-sm text-gray-500">({reviews.totalCount} reviews)</span>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                This exclusive piece of art reflects the soul of modern creativity. Crafted with passion, it adds elegance and depth to any
                space—perfect for collectors, enthusiasts, or anyone looking to own a masterpiece.
              </p>
              <p className="text-sm text-gray-500 italic">Includes authenticity certificate and artist's signature.</p>
            </div>
          </section>

          <div className="mt-10">
            <button
              onClick={handleAddProductToCart}
              className="w-full flex items-center justify-center rounded-md bg-teal-600 px-8 py-3 text-white font-medium hover:bg-teal-700 transition-all"
            >
              <span className="mr-2">Add to Cart</span>
            </button>
            <p className="text-center text-sm mt-3 text-gray-500">Secure checkout. Fast delivery guaranteed.</p>
          </div>
        </div>

        <div className="lg:self-center">
          <img src={product.image} alt={product.name} className="aspect-square w-full rounded-lg object-cover shadow-md" />
        </div>
      </div>
    </div>
  );
}
