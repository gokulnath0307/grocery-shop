import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";

const initialState = {
  cartProduct: JSON.parse(localStorage.getItem("cart")) || [],
};

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserCartData: builder.query({
      query: () => `/cart`,
      providesTags: ["cart"],
    }),
    createCartData: builder.mutation({
      query: (body) => ({
        url: `/cart/add`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["cart"],
    }),
    updateCartData: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/cart/update/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["cart"],
    }),
    deleteCartItem: builder.mutation({
      query: (productId) => ({
        url: `/cart/remove/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: `/cart/clear`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useLazyGetAllUserCartDataQuery,
  useCreateCartDataMutation,
  useUpdateCartDataMutation,
  useDeleteCartItemMutation,
  useClearCartMutation,
} = cartApiSlice;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProduct: (state, { payload }) => {
      console.log(payload);
      
      const existingItem = state.cartProduct.find((p) => p._id === payload._id);
      if (existingItem) {
        existingItem.quantity += payload.quantity;
      } else {
        state.cartProduct.push(payload);
      }
    },

    updateQuantity: (state, { payload }) => {
      const item = state.cartProduct.find((p) => p._id === payload.productId);
      if (item) item.quantity = payload.quantity;
    },

    removeFromCart: (state, { payload }) => {
      state.cartProduct = state.cartProduct.filter((p) => p._id !== payload);
    },

    clearCart: (state) => {
      state.cartProduct = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("ISMEMBER", () => initialState)
      .addMatcher(cartApiSlice.endpoints.getAllUserCartData.matchRejected)
      .addMatcher(cartApiSlice.endpoints.getAllUserCartData.matchFulfilled, (state, { payload }) => {
        state.cartProduct = payload;
      });
  },
});

export const { setCartProduct, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice;
export const getCartSliceData = (state) => state.cart;
