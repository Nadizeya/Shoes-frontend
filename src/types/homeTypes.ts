import { BrandT, CategoryT, ProductT } from "./common";

export interface HomeData {
  maincategroies: Maincategroies;
  products: HomeProducts;
}
export type HomeProducts = {
  total: number;
  beauty_offer: ProductT[];
  Choose_for_you: ProductT[];
  New_Arrivals: ProductT[];
};

export type ProductDetailProducts = {
  total: number;
  similar_products: ProductT[];
  you_may_also_like: ProductT[];
  recently_view: ProductT[];
};

export interface MainCategory {
  id: number;
  name: string;
  brands: BrandT[];
  categories: CategoryT[];
  new_categories?: NewCategory[];
}

export type NewCategory = {
  id: number;
  name: string;
};

export type Maincategroies = MainCategory[];
