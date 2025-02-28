import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  ProductData,
  ProductDetailType,
  ProductVariation,
} from "@/types/productDetailType";
import { FaLess } from "react-icons/fa6";

const initialProductDetail: ProductDetailType = {
  productDetail: {
    id: 0,
    name: "",
    short_description: "",
    description: "",
    image: "",
    maincategory_id: 0,
    maincategory_name: "",
    category_id: 0,
    category_name: "",
    brand_id: 0,
    brand_name: "",
    isLoved: false,
    product_variations: [],
  },
  selectedItem: {
    id: 0,
    size: "",
    price: 0,
    quantity: 0,
    stock_qty: 0,
    images: [],
    videos: [],
  }, // Default empty object instead of null
};

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialProductDetail,
  reducers: {
    setProductDetail(state, action: PayloadAction<ProductData>) {
      state.productDetail = action.payload;
    },
    setSelectedItem(state, action: PayloadAction<ProductVariation>) {
      state.selectedItem = action.payload;
    },
    setSelectedSize(state, action: PayloadAction<string>) {
      state.selectedItem.size = action.payload;
    },
    setItemHeart: (state, action) => {
      return {
        ...state,
        productDetail: { ...state.productDetail, isLoved: action.payload },
      };
    },
  },
  // setSelectedColor(state, action: PayloadAction<string>) {
  //   state.selectedItem.color = action.payload;
  // },
});

// export const getMainCategories = (state: { maincategories: MainCategory }) =>
//   state.maincategories;
// export const getProducts = (state: { products: Products }) => state.products;

export const {
  setProductDetail,
  setSelectedItem,
  setSelectedSize,
  setItemHeart,
  // setSelectedColor,
} = productDetailSlice.actions;

export default productDetailSlice.reducer;
