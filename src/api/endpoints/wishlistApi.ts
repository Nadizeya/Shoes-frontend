// import { HomeApiResponse, Data } from "@/types/Home/homeTypes";
import { ProductData } from "@/types/productDetailType";
import ProtectedService from "../ProtectedService";
import { WishListProducts } from "@/types/wishlistTypes";

export const getAllWishLists = async (): Promise<{
  data: WishListProducts;
}> => {
  const response = await ProtectedService.get("/whitelists");

  return response.data;
};

export const addToWishList = async (
  data: any
): Promise<{ data: ProductData }> => {
  const response = await ProtectedService.post(`/whitelists/add`, data);
  if (response.status != 200) {
    throw new Error("Problem with fetching");
  }
  return response.data;
};

export const removeWishList = async (
  data: any
): Promise<{ data: ProductData }> => {
  const response = await ProtectedService.post(`/whitelists/remove`, data);
  if (response.status != 200) {
    throw new Error("Problem with fetching");
  }
  return response.data;
};
