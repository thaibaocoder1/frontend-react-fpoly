import StorageKeys from "@constants/StorageKeys";
import { createSlice } from "@reduxjs/toolkit";

const saveWishList = (state) =>
  localStorage.setItem(StorageKeys.WISHLIST, JSON.stringify(state.data));

const wishListSlice = createSlice({
  name: StorageKeys.WISHLIST,
  initialState: {
    data: JSON.parse(localStorage.getItem(StorageKeys.WISHLIST)) || [],
    loading: false,
    success: false,
    error: "",
  },
  reducers: {
    addProductToWishList: (state, action) => {
      const index = state.data.findIndex((item) => item === action.payload);
      if (index === -1) {
        state.data.push(action.payload);
        state.success = true;
        saveWishList(state);
      } else {
        state.error = "Item has already in wishlist";
      }
    },
    removeProductWishList: (state, action) => {
      const index = state.data.findIndex((item) => item === action.payload);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
      saveWishList(state);
    },
    clearWishList(state) {
      state.data = [];
      saveWishList(state);
    },
    loadWishList: (state, action) => {
      state.data = action.payload;
      saveWishList(state);
    },
    setEmptyError(state) {
      state.error = "";
    },
    setStatusSuccess(state) {
      state.success = false;
    },
  },
});

const { reducer, actions } = wishListSlice;
export const {
  addProductToWishList,
  removeProductWishList,
  clearWishList,
  loadWishList,
  setEmptyError,
  setStatusSuccess,
} = actions;
export default reducer;
