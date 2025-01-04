import { fetchCartItems, fetchPaymentData } from "@/api/endpoints/checkoutApi";
import { CartProductsList, PaymentDataList } from "@/types/checkOutTypes";
import { useQuery, useQueries } from "@tanstack/react-query";

export const useCheckoutItems = () => {
  const queries = useQueries({
    queries: [
      { queryKey: ["cartProducts"], queryFn: fetchCartItems },
      { queryKey: ["payment"], queryFn: fetchPaymentData },
    ],
  });

  const [cartProductsQuery, paymentQuery] = queries;

  const isLoading = cartProductsQuery.isLoading || paymentQuery.isLoading;
  const isError = cartProductsQuery.isError || paymentQuery.isError;
  const isSuccess = cartProductsQuery.isSuccess && paymentQuery.isSuccess;

  return {
    cartProducts: cartProductsQuery.data?.data as CartProductsList,
    paymentData: paymentQuery.data?.data as PaymentDataList,
    total: cartProductsQuery.data?.total as number,
    isLoading,
    isError,
    isSuccess,
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
