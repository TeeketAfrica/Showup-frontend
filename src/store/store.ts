import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import tripReducer from "./features/tripSlice"
import busReducer from "./features/busSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trip: tripReducer,
    bus: busReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
