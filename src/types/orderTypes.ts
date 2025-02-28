export interface Order {
  id: number;
  user_id?: number;
  total_price: string; // Keeping it as string because it is in the format "22000.00"
  status: "pending" | "completed" | "cancelled"; // Assuming possible statuses, update if needed
  created_date: string; // ISO date string
  updated_date: string; // ISO date string
  order_items: OrderDetailItem[];
}

export type status = "placed" | "completed" | "cancelled"; // Assuming possible statuses, update if needed

// export interface OrderItem {
//   id: number;
//   quantity: number;
//   price: string; // Keeping it as string because it is in the format "1000.00"
//   variation: {
//     id: number;
//     size: string; // e.g., "100ml"
//     color: string; // e.g., "green"
//     name: string;
//   };
// }

export interface OrderDetailItem {
  id: number;
  quantity: number;
  price: number;
  size: string;
  desc?: string;
  name: string;
  image: string;
  variation?: any;
}
export interface Delivery {
  address: string;
  name: string;
  phone_number: string;
}

export interface OrderSummary {
  total: number;
  delivery: number;
  receipt_photo: string;
}

// Extending Order
export interface DetailedOrder extends Order {
  delivery: Delivery;
  order_summary: OrderSummary;
}
