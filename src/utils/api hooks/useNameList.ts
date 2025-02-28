import { getAllBrands } from "@/api/endpoints/brandApi";
import { getByMainCategoryId } from "@/api/endpoints/categoryApi";
import { BrandT } from "@/types/common";
import { MainCategory } from "@/types/homeTypes";
import { useQuery } from "@tanstack/react-query";

export const useBrands = () => {
  const query = useQuery({
    queryKey: ["allBrands"], // Include `item` in queryKey
    queryFn: () => getAllBrands(),
  });

  return {
    brands: query.data?.data as BrandT[],
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};

export const useMainCategoryById = (id: number) => {
  const query = useQuery({
    queryKey: ["mainCategoryById"], // Include `item` in queryKey
    queryFn: () => getByMainCategoryId(id),
  });

  return {
    category: query.data?.data as MainCategory,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};
