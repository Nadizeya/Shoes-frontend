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
  address: "",
  add_to_cart: 0,
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
      state.add_to_cart = action.payload.add_to_cart;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setRegister(state, action: PayloadAction<UserT>) {
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.address = action.payload.address;
    },
    incrementAddToCart(state) {
      state.add_to_cart += 1;
    },
    decrementAddToCart(state) {
      state.add_to_cart -= 1;
    },
    incrementLoveList(state) {
      state.whilist_count += 1;
    },
    decrementLoveList(state) {
      state.whilist_count -= 1;
    },
  },
});

export const getAllUserSelector = (state: { user: UserT }) => state.user;

export const {
  setUser,
  setEmail,
  setRegister,
  incrementAddToCart,
  decrementAddToCart,
  decrementLoveList,
  incrementLoveList,
} = userSlice.actions;

export default userSlice.reducer;
