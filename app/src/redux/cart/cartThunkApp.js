import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, getCart } from "../../services/cart";

export const addCart = createAsyncThunk(
  "insert-cart",
  async (body, { rejectWithValue }) => {
    try {
      const response = await addToCart(body);
      if (response.status === 401) {
        return rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue([error.response.data]);
    }
  }
);

export const getCartData = createAsyncThunk(
  "get-cart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getCart(userId);
      if (response.status === 401) {
        return rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue([error.response.data]);
    }
  }
);
