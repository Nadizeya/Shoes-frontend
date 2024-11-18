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
  cartItems: CartItem[];
  deliveryInfo: DeliveryInfo;
  orderCost: OrderCost;
  paymentId: number;
  paymentFile: File | null; // Use File type if you're handling file uploads
}
