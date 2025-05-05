import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  productsList: [],
  productDetails: null,
};
const url = "https://e-commerce-web-backend-krf7.onrender.com";

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(`${url}/api/shop/products/get?${query}`);
    // console.log(result.data);
    return result?.data;
  }
);
export const fetchProductsDetails = createAsyncThunk(
  "/products/fetchProductsDetails",
  async (id) => {
    const result = await axios.get(`${url}/api/shop/products/get/${id}`);
    return result?.data;
  }
);

const shopProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload.data || []; // Assign the entire payload to productsList
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductsDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductsDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = [];
      });
  },
});

export default shopProductsSlice.reducer;
