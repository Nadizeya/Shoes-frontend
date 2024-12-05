import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  ProductData,
  productDetailType,
  ProductItem,
} from "@/types/productDetailType";

const initialProductDetail: productDetailType = {
  productDetail: {
    colors: [],
    id: 0,
    images: [],
    items: [],
    name: "",
    original_price: 0,
    short_description: "",
    sizes: [],
  },
  selectedItem: {
    id: 0,
    color: "",
    price: "",
    quantity: 0,
    size: "",
  },
};

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: initialProductDetail,
  reducers: {
    setProductDetail(state, action: PayloadAction<ProductData>) {
      state.productDetail = action.payload;
    },
    setSelectedItem(state, action: PayloadAction<ProductItem>) {
      state.selectedItem = action.payload;
    },
    setSelectedSize(state, action: PayloadAction<string>) {
      state.selectedItem.size = action.payload;
    },
    setSelectedColor(state, action: PayloadAction<string>) {
      state.selectedItem.color = action.payload;
    },
  },
});

// export const getMainCategories = (state: { maincategories: MainCategory }) =>
//   state.maincategories;
// export const getProducts = (state: { products: Products }) => state.products;

export const {
  setProductDetail,
  setSelectedItem,
  setSelectedSize,
  setSelectedColor,
} = productDetailSlice.actions;

export default productDetailSlice.reducer;
