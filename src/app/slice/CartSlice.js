import { createSlice } from "@reduxjs/toolkit";

const saveCart = (state) =>
  localStorage.setItem("cart", JSON.stringify(state.data));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: JSON.parse(localStorage.getItem("cart")) || [],
    loading: false,
    error: "",
  },
  reducers: {
    addProductToCart: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index === -1) {
        state.data.push(action.payload);
      } else {
        state.data[index].quantity += action.payload.quantity;
      }
      saveCart(state);
    },
    removeProductCart: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.productId === action.payload
      );
      if (index !== -1) {
        state.data.splice(index, 1);
      }
      saveCart(state);
    },
    updateProductCart: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
      saveCart(state);
    },
  },
});

const { reducer, actions } = cartSlice;
export const { addProductToCart, removeProductCart, updateProductCart } =
  actions;
export default reducer;
