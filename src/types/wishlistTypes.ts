export interface WishListProduct {
  variation_id: number;
  product_id: number;
  price: number;
  name: string;
  short_description: string;
  image: string;
}

export type WishListProducts = WishListProduct[];
