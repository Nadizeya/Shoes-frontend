import {
  fetchProductbyId,
  fetchProductbyIdWithAuth,
  fetchProductsAfterDetail,
} from "@/api/endpoints/productsApi";
import { ProductData } from "@/types/productDetailType";
import { useQueries } from "@tanstack/react-query";
import { ProductDetailProducts } from "@/types/homeTypes";
import { useAuth } from "../useAuth";

export const useProductDetails = (productId: number) => {
  const { authenticated } = useAuth();

  const queries = useQueries({
    queries: [
      {
        queryKey: ["productDetail", productId, authenticated], // Include `authenticated` to refetch when it changes
        queryFn: () =>
          authenticated
            ? fetchProductbyIdWithAuth(productId) // Fetch normally when authenticated
            : fetchProductbyId(productId), // Fetch with authentication when not authenticated
        enabled: !!productId,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["productsAfterDetail"],
        queryFn: fetchProductsAfterDetail,
      },
    ],
  });

  const [productDetailQuery, productsAfterDetailQuery] = queries;

  const isLoading =
    productDetailQuery.isLoading || productsAfterDetailQuery.isLoading;
  const isError =
    productDetailQuery.isError || productsAfterDetailQuery.isError;
  const isSuccess =
    productDetailQuery.isSuccess && productsAfterDetailQuery.isSuccess;

  return {
    productDetail: productDetailQuery.data?.data as ProductData,
    productsAfterDetail: productsAfterDetailQuery.data
      ?.data as ProductDetailProducts,
    isLoading,
    isError,
    isSuccess,
    refetch: productDetailQuery.refetch,
  };
};

export type postAddToCartT = {
  product_id: number;
  quantity: number;
  product_variations_id: number | null;
};

// export const useAddToCartMutation = () => {
//   return useMutation(postAddToCart);
// };
