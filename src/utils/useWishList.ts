import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchMainCategories, fetchHome } from "@/api/endpoints/homeApi";
import { Maincategroies, HomeProducts } from "@/types/homeTypes";
import { getAllWishLists } from "@/api/endpoints/wishlistApi";
import { WishListProducts } from "@/types/wishlistTypes";

export const useWishList = () => {
  const query = useQuery({
    queryKey: ["wishlist"],
    queryFn: getAllWishLists,
  });

  return {
    wishListsData: query.data?.data as WishListProducts,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};
