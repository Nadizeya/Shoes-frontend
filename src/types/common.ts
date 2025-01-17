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
  category_name: string;
  brand_name?: string; // Optional because not all responses have this field
  short_description: string;
  description?: string; // Optional because one response lacks this field
  original_price: number;
  discount_price?: number; // Optional because one response lacks this field
  image?: string | null; // Optional because one response has this as null
  // images?: string[] | null;
  videos?: string[] | null; // Optional because it's only in one response
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
  main_category_id: number;
  category_id: number;
  name: string;
  image: string | null;
  created_at: string | null;
  updated_at: string | null;
};
