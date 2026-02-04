import { createSlice } from "@reduxjs/toolkit";
import { getBusByRoute } from "../actions/busAction";
import type { BusProps } from "@/lib/types";



interface BusState {
  buses: BusProps[] | null;
  selectedBus: BusProps | null;
  loading: boolean;
  error: string | null;
}

const initialState: BusState = {
  buses: null,
  selectedBus: null,
  loading: false,
  error: null,
};


const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    setSelecteddBus: (state, action) => {
      state.selectedBus = action.payload;
      localStorage.clear()
    },
    clearSelectedBus: (state) => {
      state.selectedBus = null;
    }
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

export const { setSelecteddBus, clearSelectedBus } = busSlice.actions;
export default busSlice.reducer;
