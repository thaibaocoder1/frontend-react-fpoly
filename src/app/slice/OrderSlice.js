import orderApi from "@api/OrderApi";
import orderDetailApi from "@api/OrderDetailApii";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getOrderWithId = createAsyncThunk(
  "order/getOrderWithId",
  async ({ id, config }, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const orderListUser = await orderApi.getAllWithId(id, config, signal);
      return fulfillWithValue(orderListUser.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const orderInfo = await orderApi.add(payload);
      return fulfillWithValue(orderInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addOrderDetailList = createAsyncThunk(
  "order/addOrderDetailList",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const orderDetailList = await orderDetailApi.add(payload);
      return fulfillWithValue(orderDetailList.data);
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
      ordersWithUser: [],
    },
    current: null,
    loading: false,
    error: "",
  },
  reducers: {
    setEmptyError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderWithId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderWithId.fulfilled, (state, action) => {
      state.loading = false;
      state.data.ordersWithUser = action.payload;
      state.error = "";
    });
    builder.addCase(getOrderWithId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
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
    builder.addCase(addOrderDetailList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrderDetailList.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addOrderDetailList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const { reducer, actions } = orderSlice;
export const { setEmptyError } = actions;
export default reducer;
