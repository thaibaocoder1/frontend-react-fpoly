import store, { persistor } from "@app/store.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "swiper/css";
import "swiper/css/scrollbar";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  </React.StrictMode>
);
