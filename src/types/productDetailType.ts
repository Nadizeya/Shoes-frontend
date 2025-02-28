export type ProductVariation = {
  id: number;
  size: string;
  price: number;
  quantity: number;
  stock_qty: number; // Added to match API response
  images: string[]; // Matches API response
  videos?: string[]; // Optional field as per API response
};

export interface ProductData {
  id: number;
  name: string;
  short_description: string;
  description: string;
  image: string; // Matches API response
  maincategory_id: number;
  maincategory_name: string;
  category_id: number;
  category_name: string;
  brand_id: number;
  brand_name: string;
  isLoved?: boolean;
  product_variations: ProductVariation[]; // Matches API response structure
}

export type ProductDetailType = {
  productDetail: ProductData;
  selectedItem: ProductVariation; // Allow null for initial selection
};
