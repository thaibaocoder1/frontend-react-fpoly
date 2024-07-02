import { createSlice } from "@reduxjs/toolkit";

const findProductIndex = (state, id) => {
  return state.findIndex((product) => product.id === id);
};

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
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
    removeProduct: (state, action) => {
      const index = findProductIndex(state, action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    updateProduct: (state, action) => {
      const index = findProductIndex(state, action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
  },
});

const { reducer, actions } = cartSlice;
export const { addProductToCart, removeProduct, updateProduct } = actions;
export default reducer;
