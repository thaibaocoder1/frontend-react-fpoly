import categoryApi from "@api/CategoryApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CanceledError } from "axios";

export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async (_, { rejectWithValue, fulfillWithValue, signal }) => {
    try {
      const response = await categoryApi.getAll(signal);
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
export const getOneCategory = createAsyncThunk(
  "category/getOneCategory",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await categoryApi.getOne(payload);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const response = await categoryApi.create(payload);
      dispatch(getAllCategory());
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const response = await categoryApi.update(payload);
      dispatch(getAllCategory());
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const removeCategory = createAsyncThunk(
  "category/removeCategory",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const response = await categoryApi.remove(payload);
      dispatch(getAllCategory());
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: {
      categories: [],
      pagination: {},
    },
    current: null,
    loading: false,
    show: false,
    error: "",
  },
  reducers: {
    setShowDialog(state) {
      state.show = true;
      state.current = null;
    },
    setHideDialog(state) {
      state.show = false;
      state.current = null;
    },
    setEmptyError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      const { data, pagination } = action.payload;
      state.data = { ...state.data, categories: data, pagination };
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getAllCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getOneCategory.pending, (state) => {
      state.show = true;
      state.loading = true;
    });
    builder.addCase(getOneCategory.fulfilled, (state, action) => {
      state.current = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getOneCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.loading = false;
      state.show = false;
      state.error = "";
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.loading = false;
      state.show = false;
      state.error = "";
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(removeCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeCategory.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(removeCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const { reducer, actions } = categorySlice;
export const { setShowDialog, setHideDialog, setEmptyError } = actions;
export default reducer;
