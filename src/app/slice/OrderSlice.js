import userApi from "@api/UserApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.register(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    data: {
      orders: [],
      pagination: {},
    },
    current: null,
    loading: false,
    error: "",
  },
  reducers: {},
});

const { reducer } = orderSlice;
export default reducer;
