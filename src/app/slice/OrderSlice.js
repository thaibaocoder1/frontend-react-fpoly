import orderApi from "@api/OrderApi";
import orderDetailApi from "@api/OrderDetailApii";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getOrderWithoutId = createAsyncThunk(
  "order/getOrderWithoutId",
  async (config, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const orderList = await orderApi.getAll(config, signal);
      return fulfillWithValue({
        data: orderList.data,
        pagination: orderList.pagination,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getOrderWithId = createAsyncThunk(
  "order/getOrderWithId",
  async ({ id, config }, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const orderListUser = await orderApi.getAllWithId(id, config, signal);
      return fulfillWithValue({
        data: orderListUser.data,
        pagination: orderListUser.pagination,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getOneOrderWithId = createAsyncThunk(
  "order/getOneOrderWithId",
  async (id, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const orderDetail = await orderApi.getOneWithId(id, signal);
      return fulfillWithValue(orderDetail.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getOrderDetailWithId = createAsyncThunk(
  "order/getOrderDetailWithId",
  async (id, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const orderDetail = await orderDetailApi.getOne(id, signal);
      return fulfillWithValue(orderDetail.data);
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
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const orderInfo = await orderApi.cancel(payload);
      dispatch(getOneOrderWithId(payload.id));
      return fulfillWithValue(orderInfo.data);
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
    ordersWithUser: {
      orders: [],
      pagination: {},
    },
    current: null,
    details: null,
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
      const { data, pagination } = action.payload;
      state.loading = false;
      state.ordersWithUser = { orders: data, pagination };
      state.error = "";
    });
    builder.addCase(getOrderWithId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOrderWithoutId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderWithoutId.fulfilled, (state, action) => {
      const { data, pagination } = action.payload;
      state.loading = false;
      state.data = { ...state.data, orders: data, pagination };
      state.error = "";
    });
    builder.addCase(getOrderWithoutId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOneOrderWithId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneOrderWithId.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
      state.error = "";
    });
    builder.addCase(getOneOrderWithId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOrderDetailWithId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetailWithId.fulfilled, (state, action) => {
      state.loading = false;
      state.details = action.payload;
      state.error = "";
    });
    builder.addCase(getOrderDetailWithId.rejected, (state, action) => {
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
    builder.addCase(cancelOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(cancelOrder.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(cancelOrder.rejected, (state, action) => {
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
