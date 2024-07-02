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
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builer) => {
    builer.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builer.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builer.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builer.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builer.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builer.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

const { reducer } = authSlice;
export default reducer;
