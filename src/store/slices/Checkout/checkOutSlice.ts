import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CartItemT,
  CheckOutT,
  DeliveryInfo,
  OrderCost,
  PaymentDataList,
} from "../../../types/checkOutTypes";

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
  paymentData: [],
  paymentId: 0,
  paymentFile: null,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItemT[]>) {
      state.cartItems = action.payload;
    },
    setPayment(state, action: PayloadAction<PaymentDataList>) {
      state.paymentData = action.payload;
      // state.paymentFile = action.payload.file;
    },
    setTotalCost(state, action: PayloadAction<number>) {
      state.orderCost.total = action.payload;
    },
    changePaymentId(state, action: PayloadAction<number>) {
      state.paymentId = action.payload;
    },
    changePaymentFile(state, action: PayloadAction<File | null>) {
      console.log(action.payload, "in slice");
      state.paymentFile = action.payload;
    },

    incrementQuantity(state, action: PayloadAction<number>) {
      const item = state.cartItems.find(
        (item) => item.cart_item_id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const item = state.cartItems.find(
        (item) => item.cart_item_id === action.payload
      );
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

    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const getCartItems = (state: { cartItems: CartItemT[] }) =>
  state.cartItems;

export const {
  setCartItems,
  setTotalCost,
  changePaymentId,
  changePaymentFile,
  updateDeliveryInfo,
  updateOrderCost,
  setPayment,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  updateTotalCost, // Export the new action
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
