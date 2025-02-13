import {
  fetchProductbyId,
  fetchProductsAfterDetail,
} from "@/api/endpoints/productsApi";
import { ProductData } from "@/types/productDetailType";
import { useQueries } from "@tanstack/react-query";
import { ProductDetailProducts } from "@/types/homeTypes";

export const useProductDetails = (productId: number) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["productDetail", productId],
        queryFn: () => fetchProductbyId(productId),
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
