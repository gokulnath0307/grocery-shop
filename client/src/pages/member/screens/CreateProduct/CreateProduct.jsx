import React, { useEffect, useState } from "react";
import { useCreateProductMutation, useLazyGetOneProductByIDQuery, useUpdateProductMutation } from "../../../../redux/slices/productSlice";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import catchFunction from "../../../../common/catchFunction";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const [createProductApi] = useCreateProductMutation();
  const [getOneProductDataApi] = useLazyGetOneProductByIDQuery();
  const [updateProductApi] = useUpdateProductMutation();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = searchparams.get("id");
    if (id) {
      fetchProductById(id);
    }
  }, [searchparams]);

  const fetchProductById = async (id) => {
    try {
      const response = await getOneProductDataApi(id).unwrap();
      const { name, price, quantity, category, image } = response;
      setProduct({ name, price, quantity, category, image });
      setPreview(image);
    } catch (error) {
      catchFunction(error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, price, quantity, category, image } = product;

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!price || isNaN(price) || Number(price) <= 0) newErrors.price = "Valid price required.";
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) newErrors.quantity = "Valid quantity required.";
    if (!category.trim()) newErrors.category = "Category is required.";
    if (!image) newErrors.image = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setPreview(null);
      setErrors((prev) => ({
        ...prev,
        image: "Only JPG, JPEG, PNG, and WEBP images are allowed.",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPreview(null);
      setErrors((prev) => ({
        ...prev,
        image: "File size must be less than 5MB.",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setErrors((prev) => ({ ...prev, image: "" }));
      setProduct((prev) => ({ ...prev, image: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const id = searchparams.get("id");
      if (id) {
        await updateProductApi({ ...product, id }).unwrap();
        toast.success("Product updated");
      } else {
        await createProductApi(product).unwrap();
        toast.success("Product created");
      }
      navigate("/member/product");
    } catch (error) {
      catchFunction(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{searchparams.get("id") ? "Update Product" : "Create Product"}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Name */}
        <div className="col-span-1">
          <input
            type="text"
            name="name"
            placeholder="Item name (e.g., Apples)"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Price */}
        <div className="col-span-1">
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={product.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full p-2 border rounded"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Quantity */}
        <div className="col-span-1">
          <input
            type="number"
            name="quantity"
            placeholder="Quantity (e.g., 1)"
            value={product.quantity}
            onChange={handleChange}
            min="1"
            className="w-full p-2 border rounded"
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
        </div>

        {/* Category */}
        <div className="col-span-1">
          <select name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded">
            <option hidden value="">
              Select Category
            </option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="dairy">Dairy</option>
            <option value="snacks">Snacks</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Image Upload */}
        <div className="col-span-2">
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="col-span-2">
            <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded mt-2" />
          </div>
        )}

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-500 text-white py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600 transition"
            }`}
          >
            {loading ? "Processing..." : searchparams.get("id") ? "Update Product" : "Submit Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
