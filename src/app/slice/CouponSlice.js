import couponApi from "@api/CouponApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const saveCoupon = (list) =>
  localStorage && localStorage.setItem("coupon", JSON.stringify(list));
export const getAllCoupons = createAsyncThunk(
  "coupon/getAllCoupons",
  async (payload, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const response = await couponApi.getAll(payload, signal);
      return fulfillWithValue({
        data: response.data,
        pagination: response.pagination,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getOneCoupon = createAsyncThunk(
  "coupon/getOneCoupon",
  async (payload, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const response = await couponApi.getOne(payload, signal);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addCoupon = createAsyncThunk(
  "coupon/addCoupon",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const response = await couponApi.add(payload);
      dispatch(getAllCoupons());
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateCoupon = createAsyncThunk(
  "coupon/updateCoupon",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const response = await couponApi.update(payload);
      dispatch(getAllCoupons());
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const removeCoupon = createAsyncThunk(
  "coupon/removeCoupon",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const response = await couponApi.remove(payload);
      dispatch(getAllCoupons());
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const checkCoupon = createAsyncThunk(
  "coupon/checkCoupon",
  async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const { coupon } = getState();
      const { couponStorage } = coupon.data;
      const response = await couponApi.check(payload);
      const { _id, name, value } = response.data;
      const updatedStorage =
        couponStorage.length === 0
          ? [{ _id, name, value }]
          : [...couponStorage, { _id, name, value }];
      localStorage.setItem("coupon", JSON.stringify(updatedStorage));
      return fulfillWithValue({
        data: response.data,
        storage: updatedStorage,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    data: {
      coupons: [],
      pagination: {},
      couponStorage: JSON.parse(localStorage.getItem("coupon")) || [],
    },
    current: null,
    show: false,
    loading: false,
    error: "",
  },
  reducers: {
    setEmptyError(state) {
      state.error = "";
    },
    setEmtpyCoupon(state) {
      state.current = null;
    },
    clearCoupon(state) {
      state.data.couponStorage = [];
    },
    toggleDialog(state) {
      state.show = !state.show;
    },
    deleteCouponStorage(state, action) {
      const newCouponList = state.data.couponStorage.filter(
        (coupon) => coupon.name !== action.payload
      );
      state.data.couponStorage = newCouponList;
      saveCoupon(newCouponList);
    },
    loadCoupon(state, action) {
      state.data.couponStorage = action.payload;
      saveCoupon(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCoupons.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCoupons.fulfilled, (state, action) => {
      const { data, pagination } = action.payload;
      state.data = { ...state.data, coupons: data, pagination };
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getAllCoupons.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(checkCoupon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkCoupon.fulfilled, (state, action) => {
      const { storage } = action.payload;
      state.data.couponStorage = storage;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(checkCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOneCoupon.pending, (state) => {
      state.loading = true;
      state.show = true;
    });
    builder.addCase(getOneCoupon.fulfilled, (state, action) => {
      state.current = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getOneCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addCoupon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCoupon.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateCoupon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCoupon.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(removeCoupon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeCoupon.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(removeCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const { reducer, actions } = couponSlice;
export const {
  setEmptyError,
  toggleDialog,
  setEmtpyCoupon,
  deleteCouponStorage,
  loadCoupon,
  clearCoupon,
} = actions;
export default reducer;
