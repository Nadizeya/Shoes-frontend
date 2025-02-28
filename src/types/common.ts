import { PaginationT } from "./categoryTypes";

export type GetAllResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type ProductT = {
  id: number;
  name: string;
  category_id: number;
  brand_id: number;
  brand_name: string;
  category_name: string;
  short_description: string;
  price: number;
  image: string | null;
};

export type CategoryT = {
  id: number;
  main_category_id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
};

export type BrandT = {
  id: number;
  name: string;
  main_category_name: string;
  main_category_id: number;
  image: string;
};

export type ProductsByPage = {
  products: ProductT[];
  pagination: PaginationT;
};

export type Variation = {
  id: number;
  product_id: number;
  size: string;
  quantity: number;
  price: string;
  stock_qty: number;
  sell_qty: number;
  created_at: string;
  updated_at: string;
};

export type NewProduct = {
  id: number;
  name: string;
  short_description: string;
  description: string;
  sell_qty: number;
  stock_qty: number;
  is_recommend: number;
  category_id: number;
  brand_id: number;
  created_at: string;
  updated_at: string;
  variations: Variation[];
};
