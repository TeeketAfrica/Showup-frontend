import { createSlice } from "@reduxjs/toolkit";
import { getBusByRoute } from "../actions/busAction";
import type { BusProps } from "@/lib/types";



interface BusState {
  buses: BusProps[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: BusState = {
  buses: null,
  loading: false,
  error: null,
};


const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null;
    //   localStorage.removeItem("token");
    // },
  },
  extraReducers: (builder) => {
    builder

    // GET TRIP
      .addCase(getBusByRoute.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBusByRoute.fulfilled, (state, action) => {
        state.loading = false;
        state.buses = action.payload;
      })
      .addCase(getBusByRoute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});

export default busSlice.reducer;
