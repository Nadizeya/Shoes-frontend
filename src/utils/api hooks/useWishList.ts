import { useIsFetching, useQuery } from "@tanstack/react-query";
import { getAllWishLists } from "@/api/endpoints/wishlistApi";
import { WishListProducts } from "@/types/wishlistTypes";

export const useWishList = () => {
  const query = useQuery({
    queryKey: ["wishlist"],
    queryFn: getAllWishLists,
  });
  const isFetching = useIsFetching();

  return {
    wishListsData: query.data?.data as WishListProducts,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    isFetching,
    refetch: query.refetch,
  };
};
