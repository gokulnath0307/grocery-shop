import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";

const initialState = {
  orderData: [],
  soldOrderData: [],
};

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveOrderProducts: builder.mutation({
      query: (body) => ({
        url: "/order/checkout",
        method: "POST",
        body,
      }),
      transformErrorResponse: (err) => ({
        status: err.originalStatus || err.status || "UNKNOWN_ERROR",
        data: err.data || { message: "An unknown error occurred" },
      }),
      invalidatesTags: ["order"],
    }),
    getAllUserOrderProduct: builder.query({
      query: () => `/order/history`,
      transformResponse: (response) => response,
      transformErrorResponse: (err) => ({
        status: err.originalStatus || err.status || "UNKNOWN_ERROR",
        data: err.data || { message: "An unknown error occurred" },
      }),
      providesTags: ["order"],
    }),
    getAllSoldOrderProduct: builder.query({
      query: () => `/order/soldproduct`,
      transformResponse: (response) => response,
      transformErrorResponse: (err) => ({
        status: err.originalStatus || err.status || "UNKNOWN_ERROR",
        data: err.data || { message: "An unknown error occurred" },
      }),
      providesTags: ["order"],
    }),
  }),
});
export const { useSaveOrderProductsMutation, useLazyGetAllUserOrderProductQuery,useLazyGetAllSoldOrderProductQuery } = orderApiSlice;

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase("ISMEMBER", () => initialState)
      .addMatcher(orderApiSlice.endpoints.getAllUserOrderProduct.matchRejected)
      .addMatcher(orderApiSlice.endpoints.getAllUserOrderProduct.matchFulfilled, (state, { payload }) => {
        state.orderData = payload;
      })
      .addMatcher(orderApiSlice.endpoints.getAllSoldOrderProduct.matchRejected)
      .addMatcher(orderApiSlice.endpoints.getAllSoldOrderProduct.matchFulfilled, (state, { payload }) => {
        state.soldOrderData = payload;
      })
  },
});

export default orderSlice;
export const getOrderSliceData = (state) => state.order;
