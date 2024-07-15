import { createSlice } from "@reduxjs/toolkit";

const saveWithList = (state) =>
  localStorage.setItem("withlist", JSON.stringify(state.data));

const withListSlice = createSlice({
  name: "withlist",
  initialState: {
    data: JSON.parse(localStorage.getItem("withlist")) || [],
    loading: false,
    success: false,
    error: "",
  },
  reducers: {
    addProductToWithList: (state, action) => {
      const index = state.data.findIndex((item) => item === action.payload);
      if (index === -1) {
        state.data.push(action.payload);
        state.success = true;
        saveWithList(state);
      } else {
        state.error = "Item has already in withlist";
        state.success = false;
      }
    },
    removeProductWithList: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.productId === action.payload
      );
      if (index !== -1) {
        state.data.splice(index, 1);
      }
      saveWithList(state);
    },
    updateProductWithList: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
      saveWithList(state);
    },
    clearWithList(state) {
      state.data = [];
      saveWithList(state);
    },
    loadWithList: (state, action) => {
      state.data = action.payload;
      saveWithList(state);
    },
    setEmptyError(state) {
      state.error = "";
    },
  },
});

const { reducer, actions } = withListSlice;
export const {
  addProductToWithList,
  removeProductWithList,
  updateProductWithList,
  clearWithList,
  loadWithList,
  setEmptyError,
} = actions;
export default reducer;
