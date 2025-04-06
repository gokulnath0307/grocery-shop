import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";

const initialState = {
  userProductFullData: [],
  userProductTableData: [],
  productFullData: [],
  productTableData: [],
  getOneProducByIdData: {},
};
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `/user/product`,
      transformResponse: (response) => response,
      transformErrorResponse: (err) => ({
        status: err.originalStatus || err.status || "UNKNOWN_ERROR",
        data: err.data || { message: "An unknown error occurred" },
      }),
    }),
    getOneProductByID: builder.query({
      query: (id) => `/user/product/${id}`,
      transformResponse: (response) => response,
      transformErrorResponse: (err) => ({
        status: err.originalStatus || err.status || "UNKNOWN_ERROR",
        data: err.data || { message: "An unknown error occurred" },
      }),
    }),
    getAllUserProduct: builder.query({
      query: () => `/product`,
      transformResponse: (response) => response,
      transformErrorResponse: (err) => ({
        status: err.originalStatus || err.status || "UNKNOWN_ERROR",
        data: err.data || { message: "An unknown error occurred" },
      }),
      providesTags: ["memberproduct"],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: `/product/create`,
        method: "POST",
        body: body,
      }),
      transformErrorResponse: (err) => ({
        status: err.originalStatus || err.status || "UNKNOWN_ERROR",
        data: err.data || { message: "An unknown error occurred" },
      }),
      invalidatesTags: ["memberproduct"],
    }),
    updateProduct: builder.mutation({
      query: (body) => ({
        url: `/product/update/${body.id}`,
        method: "PUT",
        body: body,
      }),
      transformErrorResponse: (err) => ({
        status: err.originalStatus || err.status || "UNKNOWN_ERROR",
        data: err.data || { message: "An unknown error occurred" },
      }),
      invalidatesTags: ["memberproduct"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (err) => ({
        status: err.originalStatus || err.status || "UNKNOWN_ERROR",
        data: err.data || { message: "An unknown error occurred" },
      }),
      invalidatesTags: ["memberproduct"],
    }),
  }),
});

export const {
  useLazyGetAllUserProductQuery,
  useCreateProductMutation,
  useLazyGetAllProductsQuery,
  useLazyGetOneProductByIDQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setGetOneProduct: (state, { payload }) => {
      state.getOneProducByIdData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("ISMEMBER", () => initialState)
      .addMatcher(productApiSlice.endpoints.getAllProducts.matchRejected)
      .addMatcher(productApiSlice.endpoints.getAllProducts.matchFulfilled, (state, { payload }) => {
        state.productFullData = payload;
        state.productTableData = payload;
      })
      .addMatcher(productApiSlice.endpoints.getOneProductByID.matchRejected)
      .addMatcher(productApiSlice.endpoints.getOneProductByID.matchFulfilled, (state, { payload }) => {
        state.getOneProducByIdData = payload;
      })
      .addMatcher(productApiSlice.endpoints.getAllUserProduct.matchRejected)
      .addMatcher(productApiSlice.endpoints.getAllUserProduct.matchFulfilled, (state, { payload }) => {
        state.userProductFullData = payload;
        state.userProductTableData = payload;
      });
  },
});
export default productSlice;
export const { setGetOneProduct } = productSlice.actions;
export const getProductSliceData = (state) => state.product;
