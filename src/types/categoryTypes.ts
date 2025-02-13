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

export interface DetailType {
  id: number;
  name: string;
  main_category_name: string;
  main_category_id: number;
  image: string;
  products: ProductT[];
  pagination: PaginationT;
}

type PaginationT = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};
