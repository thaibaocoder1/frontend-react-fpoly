import orderApi from "@api/OrderApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await orderApi.add(payload);
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
  extraReducers: (builder) => {
    builder.addCase(addOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
      state.error = "";
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const { reducer } = orderSlice;
export default reducer;
