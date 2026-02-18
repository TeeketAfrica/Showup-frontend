import { createAsyncThunk } from "@reduxjs/toolkit";
import TripService, { type ManifestProps, type NotifyMeProps, type TripBookingProps, type TripPaymentProps } from "../services/tripService";

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


export const bookTrip = createAsyncThunk(
  "trip/bookTrip",
  async (data: TripBookingProps, thunkAPI) => {
    try {
      const res = await TripService.BookTrip(data);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
export const initiatePayment = createAsyncThunk(
  "trip/initiatePayment",
  async (data: TripPaymentProps, thunkAPI) => {
    try {
      const res = await TripService.InitiatePayment(data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
export const notifyMe = createAsyncThunk(
  "trip/notifyme",
  async (data: NotifyMeProps, thunkAPI) => {
    try {
      const res = await TripService.NotifyMe(data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
export const getPassangerManifest = createAsyncThunk(
  "trip/getPassangerManifest",
  async (data: ManifestProps, thunkAPI) => {
    try {
      const res = await TripService.GetPassangerManifest(data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);