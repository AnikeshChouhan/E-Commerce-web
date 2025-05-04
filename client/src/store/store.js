import { configureStore } from "@reduxjs/toolkit";
import adminProductsSlice from "../store/admin/Products-slice/index";
import authReducer from "../store/auth-slice/index";
import shopProductSlice from "../store/shop/products-slice/index";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    shopProducts: shopProductSlice,
  },
});
