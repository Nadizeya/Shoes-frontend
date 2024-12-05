import { useQuery, useQueries } from "@tanstack/react-query";
import { fetchMainCategories, fetchHome } from "@/api/endpoints/homeApi";
import { Maincategroies, HomeProducts } from "@/types/homeTypes";

export const useHomeData = () => {
  const queries = useQueries({
    queries: [
      { queryKey: ["maincategories"], queryFn: fetchMainCategories },
      { queryKey: ["products"], queryFn: fetchHome },
    ],
  });

  const [mainCategoriesQuery, productsQuery] = queries;

  const isLoading = mainCategoriesQuery.isLoading || productsQuery.isLoading;
  const isError = mainCategoriesQuery.isError || productsQuery.isError;
  const isSuccess = mainCategoriesQuery.isSuccess && productsQuery.isSuccess;

  return {
    mainCategories: mainCategoriesQuery.data?.data as Maincategroies,
    productsData: productsQuery.data?.data as HomeProducts,
    isLoading,
    isError,
    isSuccess,
  };
};
