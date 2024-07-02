import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@modules/client/Auth/AuthSlice";
import cartReducer from "@modules/client/Cart/CartSlice";
import productReducer from "@modules/client/Product/ProductSlice";

const rootReducer = {
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
};
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
