import { createAsyncThunk } from "@reduxjs/toolkit";
import TripService from "../services/tripService";

export const getTrips = createAsyncThunk(
  "trip/getTrip",
  async (
     _,
    thunkAPI
  ) => {
    try {
      const data = await TripService.GetTrips();
      return data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
