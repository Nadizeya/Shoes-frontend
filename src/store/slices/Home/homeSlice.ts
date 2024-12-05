import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductT } from "@/types/common";
import {
  HomeData,
  MainCategory,
  Maincategroies,
  HomeProducts,
} from "@/types/homeTypes";

// const initialProductState: ProductT = {
//   brand_id: 0,
//   category_id: 0,
//   category_name: "",
//   id: 0,
//   image: [],
//   name: "",
//   original_price: 0,
//   description: "",
//   discount_price: 0,
//   short_description: "",
// };

const initialHomeState: HomeData = {
  maincategroies: [],
  products: {
    total: 0,
    beauty_offer: [],
    Choose_for_you: [],
    New_Arrivals: [],
  },
};

export const homeSlice = createSlice({
  name: "home",
  initialState: initialHomeState,
  reducers: {
    setMainCategories(state, action: PayloadAction<Maincategroies>) {
      state.maincategroies = action.payload;
    },
    setProducts(state, action: PayloadAction<HomeProducts>) {
      state.products = action.payload;
    },
  },
});

export const getMainCategories = (state: { maincategories: MainCategory }) =>
  state.maincategories;
export const getProducts = (state: { products: HomeProducts }) =>
  state.products;

export const { setMainCategories, setProducts } = homeSlice.actions;

export default homeSlice.reducer;
