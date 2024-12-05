import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthT = { signedIn: boolean; token: string | null };

const initialState: AuthT = {
  signedIn: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess(state, action: PayloadAction<string>) {
      state.signedIn = true;
      state.token = action.payload.token;
    },
    signOutSuccess(state) {
      state.signedIn = false;
      state.token = null;
    },
  },
});

export const { signInSuccess, signOutSuccess } = authSlice.actions;

export const accessTokenState = (state: { auth: AuthT }) => state.auth;

export default authSlice.reducer;
