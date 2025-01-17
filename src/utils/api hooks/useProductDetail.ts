import { fetchProductbyId } from "@/api/endpoints/productsApi";
import { ProductData } from "@/types/productDetailType";
import { useQuery } from "@tanstack/react-query";

export const useProductDetails = (productId: number) => {
  const query = useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => fetchProductbyId(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
  });
  return {
    productDetail: query.data?.data as ProductData,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
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
