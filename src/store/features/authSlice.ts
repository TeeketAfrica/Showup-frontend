import { createSlice } from "@reduxjs/toolkit";
import { checkUser, registerUser } from "../actions/authAction";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  mobile: string;
  has_completed_signup: boolean;
  role: string;
  is_verified: boolean;
  date_created: string;
}

interface AuthState {
  user: User | null;
  exists: boolean | null;
  loading: boolean;
  error: string | null;
  checked: boolean
}

const initialState: AuthState = {
  user: null,
  exists: null,
  loading: false,
  error: null,
  checked: false
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkExistingUser: (state) => {
      const existing_userData = localStorage.getItem('userData')
      if(existing_userData){
        const existing_user = JSON.parse(existing_userData)
        state.user = existing_user
      }else{
        state.user = null;
      }
      state.checked = true;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

    // CHECK USER
      .addCase(checkUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        console.log("Auth fulfilled with payload:", action.payload);
        localStorage.setItem('userData', JSON.stringify(action.payload))
        state.loading = false;
        state.exists = true;
        state.user = action.payload;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.loading = false;
        state.exists = null;
        state.error = action.payload as string;
      })


      // REGISTER USER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.exists = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { checkExistingUser, logout } = authSlice.actions;
export default authSlice.reducer;
