import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StorageKeys from "@constants/StorageKeys";
import userApi from "@api/UserApi";

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.register(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.login(payload);
      localStorage.setItem(StorageKeys.TOKEN, userInfo.data.accessToken);
      return fulfillWithValue(userInfo.data.user);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      await userApi.logout(payload);
      localStorage.removeItem(StorageKeys.TOKEN);
      return fulfillWithValue({});
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

const { reducer } = authSlice;
export default reducer;
