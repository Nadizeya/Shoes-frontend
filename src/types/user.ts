export type UserT = {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address: string;
  order_count: number;
  whilist_count: number;
  add_to_cart: number;
  photo?: string | null; // Optional, can be null
  verify?: number; // Optional
  terminate?: string | null; // Optional, can be null
  dob?: string; // Optional date of birth
  user?: any; // Optional, as it's null in the given data
};
