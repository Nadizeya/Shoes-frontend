// types.ts (or your types definition file)

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

export interface CartItemT {
  cart_item_id: number;
  quantity: number;
  total_price: number;
  price: number;
  product_id: number;
  name: string;
  short_description: string;
  image: string;
  variant: VariantT;
}

type VariantT = {
  id: number;
  size: string;
  price: number;
  image: string;
};

export interface CheckOutT {
  cartItems: CartItemT[];
  deliveryInfo: DeliveryInfo;
  orderCost: OrderCost;
  paymentData: PaymentDataList;
  paymentId: number;
  paymentFile: File | null;
}

export type CartResponseType = {
  success: boolean;
  data: CartItemT[];
  total: number;
};

export type Userdetails = {
  account_id: number;
  name: string;
  pay_number: string;
  bank_number: string;
};

export type PaymentData = {
  id: number;
  image: string;
  name: string;
  bank_type: string;
  userdetails: Userdetails;
};

export type PaymentDataList = PaymentData[];
