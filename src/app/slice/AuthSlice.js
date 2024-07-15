import userApi from "@api/UserApi";
import StorageKeys from "@constants/StorageKeys";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadCart } from "./CartSlice";

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
export const active = createAsyncThunk(
  "auth/active",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.active(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue, fulfillWithValue, dispatch }) => {
    try {
      const userInfo = await userApi.login(payload);
      localStorage.setItem(StorageKeys.TOKEN, userInfo.data.accessToken);
      dispatch(loadCart(userInfo.data.user.cart));
      return fulfillWithValue(userInfo.data.user);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const forgot = createAsyncThunk(
  "auth/forgot",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.forgot(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const reset = createAsyncThunk(
  "auth/reset",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.reset(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const recover = createAsyncThunk(
  "auth/recover",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.requestRecover(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const confirmRecover = createAsyncThunk(
  "auth/confirmRecover",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.confirmRecover(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.refreshToken();
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const userInfo = await userApi.change(payload);
      return fulfillWithValue(userInfo.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const cart =
        localStorage && localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : [];
      const data = { id: payload, cart };
      await userApi.logout(data);
      localStorage.removeItem(StorageKeys.TOKEN);
      localStorage.removeItem("cart");
      return fulfillWithValue(null);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: "",
    isAdmin: false,
  },
  reducers: {
    setEmtpyUser(state) {
      state.user = null;
    },
    setEmtpyError(state) {
      state.error = "";
    },
  },
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
      state.error = action.payload;
    });
    builder.addCase(active.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(active.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(active.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(forgot.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgot.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(forgot.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(reset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(reset.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(reset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(recover.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(recover.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(recover.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(confirmRecover.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(confirmRecover.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(confirmRecover.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAdmin = action.payload.role === "Admin" ? true : false;
      state.error = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
      state.isAdmin = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const { reducer, actions } = authSlice;
export const { setEmtpyUser, setEmtpyError } = actions;
export default reducer;
