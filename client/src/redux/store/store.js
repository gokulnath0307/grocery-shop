import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "../slices/authSlice";
import productSlice from "../slices/productSlice";
import cartSlice from "../slices/cartSlice";
import orderSlice from "../slices/orderSlice";

const cartPersistConfig = {
  key: "cart",
  storage,
};
const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice.reducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: persistedAuthReducer,
  product: productSlice.reducer,
  cart: persistedCartReducer, // Only persisting cart
  order: orderSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
