import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemT, PaymentDataList } from "../../../types/checkOutTypes";
import { DetailedOrder, OrderDetailItem } from "@/types/orderTypes";

const initialState: DetailedOrder = {
  id: 0,
  user_id: 0,
  total_price: "0.00",
  status: "pending",
  created_date: "",
  updated_date: "",
  order_items: [],
  delivery: {
    name: "",
    phone_number: "",
    address: "",
  },
  order_summary: {
    total: 0,
    delivery: 0,
    receipt_photo: "",
  },
};
export const orderdetailSlice = createSlice({
  name: "orderdetail",
  initialState,
  reducers: {
    setOrderPayment(state, action: PayloadAction<DetailedOrder>) {
      state.id = action.payload.id;
      state.total_price = action.payload.total_price;
      state.status = action.payload.status;
      state.created_date = action.payload.created_date;
      state.updated_date = action.payload.updated_date;
      state.order_items = action.payload.order_items;
      state.delivery = action.payload.delivery;
      state.order_summary = action.payload.order_summary;
    },
    setTotalCost(state, action: PayloadAction<number>) {
      state.order_summary.total = action.payload;
    },
  },
});

export const { setTotalCost, setOrderPayment } = orderdetailSlice.actions;

export default orderdetailSlice.reducer;
