import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductById, getProducts } from "../../services/products";

export const fetchProducts = createAsyncThunk(
  "fetch-product",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProducts();
      if (response.status === 401) {
        return rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue([error.response.data]);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "fetch-product-by-id",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getProductById(productId);
      if (response.status === 401) {
        return rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue([error.response.data]);
    }
  }
);
