import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth-slice/index";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
