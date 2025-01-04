import { useQuery, useQueries, keepPreviousData } from "@tanstack/react-query";
import { getCategoryById } from "@/api/endpoints/categoryApi";
import { CategoryData, categoryProduct } from "@/types/categoryTypes";
import React from "react";

export const useCategoryDetail = () => {
  const [page, setPage] = React.useState(1);
  const [allProducts, setAllProducts] = React.useState<categoryProduct[]>([]);

  const query = useQuery({
    queryKey: ["categoryDetail", page],
    queryFn: () => getCategoryById(page, 20),
    placeholderData: keepPreviousData,
    // enabled: page > 1,
  });

  React.useEffect(() => {
    if (query.isSuccess) {
      setAllProducts((prev) => [...prev, ...query.data.data]);
    }
  }, [query.data?.data, query.isSuccess]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return {
    products: allProducts, // Return all products
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    loadMore,
  };
};
