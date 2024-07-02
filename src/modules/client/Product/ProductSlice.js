import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: "",
  },
  reducers: {},
});

const { reducer } = cartSlice;
export default reducer;
