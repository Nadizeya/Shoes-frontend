// import { HomeApiResponse, Data } from "@/types/Home/homeTypes";
import { ProductData } from "@/types/productDetailType";
import PublicService from "../PublicService";
import { postAddToCartT } from "@/utils/api hooks/useProductDetail";
import ProtectedService from "../ProtectedService";
import { ProductDetailProducts } from "@/types/homeTypes";
import { AxiosResponse } from "axios";
import { ProductsByPage } from "@/types/common";
import { NewProductsType } from "@/types/categoryTypes";

export const getAllProducts = async (
  page: number,
  perPage: number
): Promise<{
  data: ProductsByPage;
}> => {
  const response: AxiosResponse<{ data: ProductsByPage }> =
    await ProtectedService.get(
      `/all-products/?per_page=${perPage}&page=${page}`
    );

  return response.data;
};

export const getRecommendedProducts = async (
  page: number,
  perPage: number
): Promise<{
  data: ProductsByPage;
}> => {
  const response: AxiosResponse<{ data: ProductsByPage }> =
    await ProtectedService.get(
      `/recommend-products?per_page=${perPage}&page=${page}`
    );

  return response.data;
};

export const fetchProductbyId = async (
  id: number
): Promise<{ data: ProductData }> => {
  const response = await PublicService.get(`/all-products/${id}`);
  if (response.status != 200) {
    throw new Error("Problem with fetching");
  }
  return response.data;
};

export const getAllNewProducts = async (
  page: number,
  perPage: number
): Promise<{
  data: NewProductsType;
}> => {
  const response: AxiosResponse<{ data: NewProductsType }> =
    await ProtectedService.get(`/all-news/?per_page=${perPage}&page=${page}`);

  return response.data;
};

export const fetchProductbyIdWithAuth = async (
  id: number
): Promise<{ data: ProductData }> => {
  const response = await ProtectedService.get(`/all-products-auth/${id}`);
  if (response.status != 200) {
    throw new Error("Problem with fetching");
  }
  return response.data;
};

export const postAddToCart = async (data: postAddToCartT) => {
  const response = await ProtectedService.post(`/add-to-cart/add`, data);
  if (response.status != 200) {
    throw new Error("Problem with posting");
  }
  return response.data;
};

export const fetchProductsAfterDetail = async (): Promise<{
  data: ProductDetailProducts;
}> => {
  const response = await PublicService.get("/products-after-details");

  return response.data;
};
