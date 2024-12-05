import { ProductData } from "@/types/productDetailType";
import ProtectedService from "../ProtectedService";
import { WishListProducts } from "@/types/wishlistTypes";
import {
  CartItem,
  CartProductsList,
  CartResponseType,
} from "@/types/checkOutTypes";

export const fetchCartItems = async (): Promise<{
  data: CartProductsList;
}> => {
  const response = await ProtectedService.get("/add-to-cart/all");

  return response.data;
};

// export const addToWishList = async (
//   data: any
// ): Promise<{ data: ProductData }> => {
//   const response = await ProtectedService.post(`/whitelists/add`, data);
//   if (response.status != 200) {
//     throw new Error("Problem with fetching");
//   }
//   return response.data;
// };

// export const removeWishList = async (
//   data: any
// ): Promise<{ data: ProductData }> => {
//   const response = await ProtectedService.post(`/whitelist/remove`, data);
//   if (response.status != 200) {
//     throw new Error("Problem with fetching");
//   }
//   return response.data;
// };
