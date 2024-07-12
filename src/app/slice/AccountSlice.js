import userApi from "@api/UserApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CanceledError } from "axios";

export const getAllAccount = createAsyncThunk(
  "account/getAllAccount",
  async (params, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const response = await userApi.getAll(params, signal);
      return fulfillWithValue({
        data: response.data,
        pagination: response.pagination,
      });
    } catch (error) {
      if (error instanceof CanceledError) return;
      return rejectWithValue(error.message);
    }
  }
);
export const getOneAccount = createAsyncThunk(
  "account/getOneAccount",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await userApi.getOne(params);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addAccount = createAsyncThunk(
  "account/addAccount",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await userApi.create(params);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateAccount = createAsyncThunk(
  "account/updateAccount",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await userApi.update(params);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    data: {
      users: [],
      pagination: {},
    },
    current: null,
    loading: false,
    error: "",
  },
  reducers: {
    setEmptyError(state) {
      state.error = "";
    },
    setEmtpyAccount(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAccount.fulfilled, (state, action) => {
      const { data, pagination } = action.payload;
      state.data = { ...state.data, users: data, pagination };
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getAllAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOneAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOneAccount.fulfilled, (state, action) => {
      state.current = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getOneAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAccount.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAccount.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const { reducer, actions } = accountSlice;
export const { setEmptyError, setEmtpyAccount } = actions;
export default reducer;
