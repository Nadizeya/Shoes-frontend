import { AxiosResponse } from "axios";
import ProtectedService from "../ProtectedService";
import { categoryProduct } from "@/types/categoryTypes";

export const getCategoryById = async (
  page: number,
  perPage: number = 20
): Promise<{
  data: categoryProduct[];
}> => {
  const response: AxiosResponse<{ data: categoryProduct[] }> =
    await ProtectedService.get(
      `/all-products?per_page=${perPage}&page=${page}`
    );

  return response.data;
};
