import { createAsyncThunk } from "@reduxjs/toolkit";
import { addUser, deleteUser, getUser, updateUser } from "../../services/user";

export const insertUser = createAsyncThunk(
  "add-user",
  async (body, { rejectWithValue }) => {
    try {
      const response = await addUser(body);
      if (response.status === 401) {
        return rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "fetch-user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      if (response.status === 401) {
        return rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue([error.response.data]);
    }
  }
);
export const editUser = createAsyncThunk(
  "update-user",
  async (body, { rejectWithValue }) => {
    try {
      const response = await updateUser(body);
      if (response.status === 401) {
        return rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeUser = createAsyncThunk(
  "users/removeUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await deleteUser(userId);

      if (response.status === 401) {
        return rejectWithValue(response.data);
      }

      return { userId }; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

