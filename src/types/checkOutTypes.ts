// types.ts (or your types definition file)

import { ProductItem } from "./productDetailType";

export interface DeliveryInfo {
  name: string;
  phoneNumber: string; // You might want to change this to number if you want to handle it as such
  address: string;
}

export interface OrderCost {
  total: number;
  deliveryCost: number;
  subtotal: number;
}

export interface CartItem {
  id: number; // Assuming you have an ID for each cart item
  title: string;
  image: string;
  color: string;
  desc: string;
  price: number; // Change this to string if price is sometimes a string
  size: string;
  quantity: number;
}

export interface CheckOutT {
  cartItems: CartProduct[];
  deliveryInfo: DeliveryInfo;
  orderCost: OrderCost;
  paymentId: number;
  paymentFile: File | null; // Use File type if you're handling file uploads
}

type Product = {
  id: number;
  name: string;
  short_description: string;
  original_price: number;
  image: string;
  item: ProductItem;
};

export type CartProduct = {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
  product: Product;
};

export type CartProductsList = CartProduct[];

export type CartResponseType = {
  success: boolean;
  data: CartProductsList;
  total: number;
};
