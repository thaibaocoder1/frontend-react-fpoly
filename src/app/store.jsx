import authReducer from "@app/slice/AuthSlice";
import cartReducer from "@app/slice/CartSlice";
import withListReducer from "@app/slice/WithlistSlice";
import productReducer from "@app/slice/ProductSlice";
import categoryReducer from "@app/slice/CategorySlice";
import accountReducer from "@app/slice/AccountSlice";
import couponReducer from "@app/slice/CouponSlice";
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
  withlist: withListReducer,
  product: productReducer,
  category: categoryReducer,
  account: accountReducer,
  coupon: couponReducer,
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
