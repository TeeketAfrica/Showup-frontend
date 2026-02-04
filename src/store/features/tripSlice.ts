import { createSlice } from "@reduxjs/toolkit";
import { getTrips } from "../actions/tripActions";
import type { BusProps, RouteProps } from "@/lib/types";

export interface Trip {
    bus: BusProps,
    route: RouteProps,
    price: string,
    id: string,
    name: string,
    description: string,
    start_time: string,
    end_time: string,
    departure_date: string,
    available_seats: number,
    status: string
    }


interface TripState {
  trips: Trip[] | null;
  selectedUniqueRouteId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TripState = {
  trips: null,
  selectedUniqueRouteId: null,
  loading: false,
  error: null,
};


const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setSelectedUniqueRouteId: (state, action) => {
      state.selectedUniqueRouteId = action.payload;
    },
    clearSelectedUniqueRouteId: (state) => {
      state.selectedUniqueRouteId = null;
    }
    // logout: (state) => {
    //   state.user = null;
    //   localStorage.removeItem("token");
    // },
  },
  extraReducers: (builder) => {
    builder

    // GET TRIP
      .addCase(getTrips.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});

export const {setSelectedUniqueRouteId, clearSelectedUniqueRouteId} = tripSlice.actions;
export default tripSlice.reducer;
