import {
  fetchProductbyId,
  fetchProductbyIdWithAuth,
  fetchProductsAfterDetail,
} from "@/api/endpoints/productsApi";
import { ProductData } from "@/types/productDetailType";
import { useQuery, useIsFetching } from "@tanstack/react-query";
import { ProductDetailProducts } from "@/types/homeTypes";
import { useAuth } from "../useAuth";

export const useProductDetails = (productId: number) => {
  const { authenticated } = useAuth();

  // ✅ Fetch `productDetail` first
  const productDetailQuery = useQuery({
    queryKey: ["productDetail", productId, authenticated],
    queryFn: () =>
      authenticated
        ? fetchProductbyIdWithAuth(productId)
        : fetchProductbyId(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  });

  const productsAfterDetailQuery = useQuery({
    queryKey: ["productsAfterDetail"],
    queryFn: fetchProductsAfterDetail,
    enabled: productDetailQuery.isSuccess,
    staleTime: 1000 * 60 * 5,
  });

  // ✅ Compute fetching/loading states
  const isFetching = useIsFetching();
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
    isFetching,
    refetch: productDetailQuery.refetch,
  };
};
