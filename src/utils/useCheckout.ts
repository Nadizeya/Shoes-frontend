import { fetchCartItems } from "@/api/endpoints/checkoutApi";
import { fetchProductbyId, postAddToCart } from "@/api/endpoints/productsApi";
import { CartProductsList, CartResponseType } from "@/types/checkOutTypes";
import { ProductData } from "@/types/productDetailType";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCheckoutItems = () => {
  const query = useQuery({
    queryKey: ["cartProducts"],
    queryFn: fetchCartItems,
  });
  return {
    cartProducts: query.data?.data as CartProductsList,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};

// export type postAddToCartT = {
//   product_id: number;
//   quantity: number;
//   product_variations_id: number | null;
// };

// export const useAddToCartMutation = () => {
//   return useMutation(postAddToCart);
// };
