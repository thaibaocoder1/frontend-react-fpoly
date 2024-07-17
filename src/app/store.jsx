import authReducer from "@app/slice/AuthSlice";
import cartReducer from "@app/slice/CartSlice";
import wishlistReducer from "@app/slice/WishlistSlice";
import productReducer from "@app/slice/ProductSlice";
import categoryReducer from "@app/slice/CategorySlice";
import accountReducer from "@app/slice/AccountSlice";
import couponReducer from "@app/slice/CouponSlice";
import orderReducer from "@app/slice/OrderSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  product: productReducer,
  category: categoryReducer,
  account: accountReducer,
  coupon: couponReducer,
  order: orderReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export default store;
