import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCategoryById } from "@/api/endpoints/categoryApi";
import React from "react";
import { getBrandById } from "@/api/endpoints/brandApi";

export const useCategoryDetail = (id: number) => {
  const [item, setItems] = React.useState(10);

  const query = useQuery({
    queryKey: ["brandDetail", id, item], // Include `item` in queryKey
    queryFn: () => getCategoryById(id, 1, item),
    placeholderData: keepPreviousData,
    keepPreviousData: true, // Keep previous data while refetching
  });

  const loadMore = () => {
    setItems((prevPage) => prevPage + 10);
  };

  return {
    products: query.data?.data.products,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    lastPage: query.data?.data.pagination.last_page,
    currentPage: query.data?.data.pagination.current_page,
    loadMore,
  };
};

export const useBrandDetail = (id: number) => {
  const [item, setItems] = React.useState(10);

  const query = useQuery({
    queryKey: ["brandDetail", id, item], // Include `item` in queryKey
    queryFn: () => getBrandById(id, 1, item),
    placeholderData: keepPreviousData,
    keepPreviousData: true, // Keep previous data while refetching
  });

  const loadMore = () => {
    setItems((prevPage) => prevPage + 10);
  };

  return {
    products: query.data?.data.products,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    lastPage: query.data?.data.pagination.last_page,
    currentPage: query.data?.data.pagination.current_page,
    loadMore,
  };
};
