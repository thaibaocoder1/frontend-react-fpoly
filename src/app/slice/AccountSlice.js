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
export const getAllAccountTrash = createAsyncThunk(
  "account/getAllAccountTrash",
  async (params, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const response = await userApi.getAllTrash(params, signal);
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
export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await userApi.delete(params);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const destroyAccount = createAsyncThunk(
  "account/destroyAccount",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await userApi.destroy(params);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const recoverAccount = createAsyncThunk(
  "account/recoverAccount",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await userApi.recover(params);
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
      deleted: [],
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
    builder.addCase(getAllAccountTrash.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAccountTrash.fulfilled, (state, action) => {
      const { data, pagination } = action.payload;
      state.data = { ...state.data, deleted: data, pagination };
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getAllAccountTrash.rejected, (state, action) => {
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
    builder.addCase(deleteAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(destroyAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(destroyAccount.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(destroyAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(recoverAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(recoverAccount.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(recoverAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const { reducer, actions } = accountSlice;
export const { setEmptyError, setEmtpyAccount } = actions;
export default reducer;
