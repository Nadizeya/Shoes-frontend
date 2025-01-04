import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserT } from "@/types/user";

const initialState: UserT = {
  id: 0,
  name: "Nay Oo Lwin",
  role: "",
  email: "",
  phone: "",
  order_count: 0,
  whilist_count: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserT>) {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.name = action.payload.name;
      state.order_count = action.payload.order_count;
      state.whilist_count = action.payload.whilist_count;
    },
    setEmail(state, action: PayloadAction<{ email: string }>) {
      state.email = action.payload.email;
    },
    setRegister(state, action: PayloadAction<UserT>) {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
  },
});

export const getAllUserSelector = (state: { user: UserT }) => state.user;

export const { setUser, setEmail, setRegister } = userSlice.actions;

export default userSlice.reducer;
