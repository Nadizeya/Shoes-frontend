import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CheckOutT, DeliveryInfo, OrderCost } from "./checkOutTypes";

const initialState: CheckOutT = {
  cartItems: [],
  deliveryInfo: {
    name: "",
    phoneNumber: "",
    address: "",
  },
  orderCost: {
    total: 0,
    deliveryCost: 0,
    subtotal: 0,
  },
  paymentId: 0,
  paymentFile: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.cartItems = action.payload;
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    incrementQuantity(state, action: PayloadAction<number>) {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    updateTotalCost(state) {
      const totalValue = state.cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      state.orderCost.total = totalValue;
      state.orderCost.subtotal = totalValue + state.orderCost.deliveryCost;
    },
    updateDeliveryInfo(state, action: PayloadAction<Partial<DeliveryInfo>>) {
      state.deliveryInfo = { ...state.deliveryInfo, ...action.payload };
    },
    updateOrderCost(state, action: PayloadAction<Partial<OrderCost>>) {
      state.orderCost = { ...state.orderCost, ...action.payload };
    },
    setPayment(
      state,
      action: PayloadAction<{ id: number; file: File | null }>
    ) {
      state.paymentId = action.payload.id;
      state.paymentFile = action.payload.file;
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const getCartItems = (state: { cartItems: CartItem[] }) =>
  state.cartItems;

export const {
  setCartItems,
  deleteItem,
  updateDeliveryInfo,
  updateOrderCost,
  setPayment,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  updateTotalCost, // Export the new action
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
