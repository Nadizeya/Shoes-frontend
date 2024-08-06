import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthT = { signedIn: boolean; access_token: string | null };

const initialState: AuthT = {
  signedIn: false,
  access_token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess(state, action: PayloadAction<AuthT>) {
      state.signedIn = true;
      state.access_token = action.payload.access_token;
    },
    signOutSuccess(state) {
      state.signedIn = false;
      state.access_token = null;
    },
  },
});

export const { signInSuccess, signOutSuccess } = authSlice.actions;

export const accessTokenState = (state: { auth: AuthT }) => state.auth;

export default authSlice.reducer;
