export type ProductImage = {
  id: number;
  product_id: number;
  path: string;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
};

export type WishListProduct = {
  id: number;
  name: string;
  short_description: string;
  description: string;
  quantity: number;
  instock: number;
  images: ProductImage[];
  original_price: number;
  discount_price: number;
  sell_qty: number;
  stock_qty: number;
  is_recommend: "TRUE" | "FALSE";
  is_discount: "TRUE" | "FALSE";
  discount_percent: number;
  category_id: number;
  subcategory_id: number | null;
  brand_id: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  pivot: {
    user_id: number;
    product_id: number;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
  };
};

export type WishListProducts = WishListProduct[];

// export const demoWishListProducts: WishListProducts = [
//   {
//     id: 1,
//     name: "a23",
//     short_description: "Short description of product p3",
//     description: "Detailed description of product p3",
//     quantity: 50,
//     instock: 50,
//     original_price: 300,
//     discount_price: 250,
//     sell_qty: 10,
//     stock_qty: 40,
//     is_recommend: "FALSE",
//     is_discount: "TRUE",
//     discount_percent: 16,
//     category_id: 2,
//     subcategory_id: null,
//     brand_id: 1,
//     created_at: "2024-10-01T12:00:00.000Z",
//     updated_at: "2024-10-10T12:00:00.000Z",
//     pivot: {
//       user_id: 101,
//       product_id: 1,
//       created_at: "2024-11-20T10:00:00.000Z",
//       updated_at: "2024-11-15T08:30:00.000Z",
//     },
//   },
//   {
//     id: 2,
//     name: "b2323",
//     short_description: "Short description of product p1",
//     description: "Detailed description of product p1",
//     quantity: 80,
//     instock: 80,
//     original_price: 100,
//     discount_price: 90,
//     sell_qty: 20,
//     stock_qty: 60,
//     is_recommend: "TRUE",
//     is_discount: "TRUE",
//     discount_percent: 10,
//     category_id: 1,
//     subcategory_id: 5,
//     brand_id: 2,
//     created_at: "2024-10-05T15:00:00.000Z",
//     updated_at: "2024-11-01T10:00:00.000Z",
//     pivot: {
//       user_id: 101,
//       product_id: 2,
//       created_at: "2024-11-15T08:30:00.000Z",
//       updated_at: "2024-11-20T10:00:00.000Z",
//     },
//   },
//   {
//     id: 3,
//     name: "c2323",
//     short_description: "Short description of product p2",
//     description: "Detailed description of product p2",
//     quantity: 100,
//     instock: 100,
//     original_price: 200,
//     discount_price: 180,
//     sell_qty: 15,
//     stock_qty: 85,
//     is_recommend: "TRUE",
//     is_discount: "TRUE",
//     discount_percent: 10,
//     category_id: 3,
//     subcategory_id: 6,
//     brand_id: 3,
//     created_at: "2024-10-10T10:00:00.000Z",
//     updated_at: "2024-11-05T15:00:00.000Z",
//     pivot: {
//       user_id: 102,
//       product_id: 3,
//       created_at: "2024-11-25T14:00:00.000Z",
//       updated_at: "2024-11-25T14:00:00.000Z",
//     },
//   },
//   {
//     id: 4,
//     name: "p10",
//     short_description: "Short description of product p10",
//     description: "Detailed description of product p10",
//     quantity: 30,
//     instock: 30,
//     original_price: 500,
//     discount_price: 450,
//     sell_qty: 5,
//     stock_qty: 25,
//     is_recommend: "FALSE",
//     is_discount: "FALSE",
//     discount_percent: 0,
//     category_id: 4,
//     subcategory_id: null,
//     brand_id: 4,
//     created_at: "2024-10-15T09:00:00.000Z",
//     updated_at: "2024-11-10T11:00:00.000Z",
//     pivot: {
//       user_id: 103,
//       product_id: 4,
//       created_at: "2024-11-30T12:00:00.000Z",
//       updated_at: "2024-11-30T12:00:00.000Z",
//     },
//   },
// ];
