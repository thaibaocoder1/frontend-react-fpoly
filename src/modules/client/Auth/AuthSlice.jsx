import { createSlice } from "@reduxjs/toolkit";
import StorageKeys from "@constants/StorageKeys";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    loading: false,
  },
  reducers: {},
});

const { reducer } = authSlice;
export default reducer;
