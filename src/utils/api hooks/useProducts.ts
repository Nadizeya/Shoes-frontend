import {
  getAllProducts,
  getRecommendedProducts,
} from "@/api/endpoints/productsApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";

export const useProducts = () => {
  const [item, setItems] = React.useState(10);

  const query = useQuery({
    queryKey: ["products", item], // Include `item` in queryKey
    queryFn: () => getAllProducts(1, item),
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

export const useRecommended = () => {
  const [item, setItems] = React.useState(10);

  const query = useQuery({
    queryKey: ["products", item], // Include `item` in queryKey
    queryFn: () => getRecommendedProducts(1, item),
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
