import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService, { type RegisterUserPayload } from "../services/authService";

export const checkUser = createAsyncThunk(
  "auth/checkUser",
  async (
    { mobile }: { mobile: string },
    thunkAPI
  ) => {
    try {
      const data = await AuthService.CheckUser(mobile);
      return data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    payload: RegisterUserPayload,
    thunkAPI
  ) => {
    try {
      const data = await AuthService.RegisterUser(payload);
      return data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
