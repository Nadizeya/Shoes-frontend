import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchMainCategories, fetchHome } from "@/api/endpoints/homeApi";
import { Maincategroies, HomeProducts } from "@/types/homeTypes";
import { getAllWishLists } from "@/api/endpoints/wishlistApi";
import { WishListProducts } from "@/types/wishlistTypes";
import { getOrderDetail, getOrderHistory } from "@/api/endpoints/orderApi";
import { DetailedOrder, Order } from "@/types/orderTypes";

export const useOrder = (id: number) => {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrderHistory(id),
  });

  return {
    orderHistory: query.data?.data as Order[],
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};

export const useOrderDetail = (order_id: number, user_id: number) => {
  const query = useQuery({
    queryKey: ["orderDetail"],
    queryFn: () => getOrderDetail(user_id, order_id),
  });

  return {
    orderDetails: query.data?.data as DetailedOrder,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};
