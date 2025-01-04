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

export interface categoryProduct {
  id: number;
  name: string;
  category_name: string;
  brand_name: string;
  short_description: string;
  original_price: number;
  images: string | null;
  videos: string | null;
}
