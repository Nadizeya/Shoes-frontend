import { fetchCartItems, fetchPaymentData } from "@/api/endpoints/checkoutApi";
import { CartItemT, PaymentDataList } from "@/types/checkOutTypes";
import { useQueries, useQueryClient } from "@tanstack/react-query";

export const useCheckoutItems = () => {
  const queryClient = useQueryClient();

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
    cartProducts: cartProductsQuery.data?.data as CartItemT[],
    paymentData: paymentQuery.data?.data as PaymentDataList,
    total: cartProductsQuery.data?.total as number,
    isLoading,
    isError,
    isSuccess,
    queryClient, // Return queryClient to invalidate queries in other files
  };
};
