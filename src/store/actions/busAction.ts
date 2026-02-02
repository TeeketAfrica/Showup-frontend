import { createAsyncThunk } from "@reduxjs/toolkit";
import BusService from "../services/busService";

export const getBusByRoute = createAsyncThunk(
  "bus/get_bus_by_route",
  async (
     {route_id}: {route_id:string},
    thunkAPI
  ) => {
    try {
      const data = await BusService.GetBusByRoute(route_id);
      return data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
