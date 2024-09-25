import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserT } from "@/types/user";

const initialState: UserT = {
  username: "Nay Oo Lwin",
  email: "",
  phone: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserT>) {
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.username = action.payload.username;
    },
  },
});

export const getAllUserSelector = (state: { user: UserT }) => state.user;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
