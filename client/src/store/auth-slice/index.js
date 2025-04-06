import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

// register func that return action and payload
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    // it will send req to server
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,

      {
        withCredentials: true,
      }
    );
    // response sended by server
    return response.data;
  }
);
// login func that return action and payload
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,

      {
        withCredentials: true,
      }
    );
   
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    // that is a also switch case that take first argument as a action second will be callback func that take two arg first is state second is action
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
