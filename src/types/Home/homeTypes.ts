import { BrandT, CategoryT, ProductT } from "../common";

export interface Data {
  maincategroies: Maincategroies;
  products: Products;
}
export type Products = {
  [key: string]: ProductT[] | number;
};

export type MainCategory = {
  id: number;
  name: string;
  created_at: string | null;
  updated_at: string | null;
  brands: BrandT[];
  categories: CategoryT[];
};

export type Maincategroies = MainCategory[];
