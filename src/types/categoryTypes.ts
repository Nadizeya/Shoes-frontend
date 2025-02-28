import { ProductT } from "./common";

export type Categories = {
  [key: string]: ProductT[];
};

// Define the main data structure
export interface CategoryData {
  id: number;
  name: string;
  main_category_name: string;
  main_category_id: number;
  image: string | null;
  products: Categories; // Dynamic categories
}

export interface BaseProductType {
  products: ProductT[];
  pagination: PaginationT;
}

export interface NewProductsType extends BaseProductType {}

export interface DetailType extends BaseProductType {
  id: number;
  name: string;
  main_category_name: string;
  main_category_id: number;
  image: string;
}

export type PaginationT = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};
