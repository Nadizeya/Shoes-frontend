export interface ProductItem {
  id: number;
  size: string;
  price: string;
  quantity: number;
  color: string;
}

export interface ProductData {
  id: number;
  name: string;
  short_description: string;
  original_price: number;
  images: string[] | null;
  sizes: string[];
  colors: string[];
  items: ProductItem[];
}

export type productDetailType = {
  productDetail: ProductData;
  selectedItem: ProductItem;
};
