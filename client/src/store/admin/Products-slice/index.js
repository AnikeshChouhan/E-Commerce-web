import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "https://e-commerce-web-backend-krf7.onrender.com";
const initialState = {
  isLoading: false,
  productList: [],
};
export const addNewProduct = createAsyncThunk(
  // type
  "/product/addNewProduct",
  // action
  async (formData) => {
    const result = await axios.post(`${url}/api/admin/products/add`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(`${url}/api/admin/products/get`);
    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${url}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    const result = await axios.delete(`${url}/api/admin/products/delete/${id}`);
    return result?.data;
  }
);
const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(addNewProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AdminProductsSlice.reducer;
