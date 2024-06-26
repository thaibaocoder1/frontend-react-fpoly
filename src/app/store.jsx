import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@modules/client/Auth/AuthSlice";

const rootReducer = {
  auth: authReducer,
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
