import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://e-commerce-web-backend-krf7.onrender.com";

// const initialState = {
//   isAuthenticated: false,
//   isLoading: false,
//   user: null,
// };

// // register func that return action and payload
// export const registerUser = createAsyncThunk(
//   "/auth/register",
//   async (formData) => {
//     // it will send req to server
//     const response = await axios.post(
//       "http://localhost:5000/api/auth/register",
//       formData,

//       {
//         withCredentials: true,
//       }
//     );
//     // response sended by server
//     return response.data;
//   }
// );
// // login func that return action and payload
// export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:5000/api/auth/login",
//       formData,

//       {
//         withCredentials: true,
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// });
// export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:5000/api/auth/check-auth",

//       {
//         withCredentials: true,
//         headers: {
//           "Cache-Control":
//             "no-store , no-Cache , must-revalidate , proxy-revalidate",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// });
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   extraReducers: (builder) => {
//     // that is a also switch case that take first argument as a action second will be callback func that take two arg first is state second is action
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload;
//         state.isAuthenticated = false;
//       })
//       .addCase(registerUser.rejected, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.success ? action.payload.user : null;
//         state.isAuthenticated = action.payload.success;
//       })
//       .addCase(loginUser.rejected, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(checkAuth.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.user = action.payload.success ? action.payload.user : null;
//         state.isAuthenticated = action.payload.success;
//       })
//       .addCase(checkAuth.rejected, (state) => {
//         state.isLoading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//       });
//   },
// });
// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/api/auth/register`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/api/auth/login`, formData, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/api/auth/check-auth`, {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store , no-Cache , must-revalidate , proxy-revalidate",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Authentication check failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post(
    `${url}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response;
});
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user || null;
        state.isAuthenticated = !!action.payload?.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user || null;
        state.isAuthenticated = !!action.payload?.user;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || "Authentication check failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
