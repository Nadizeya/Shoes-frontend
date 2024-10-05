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
  short_description?: string;
  description?: string;
  original_price: number;
  discount_price?: number;
  image: string[] | null;
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
