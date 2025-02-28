import { AxiosResponse } from "axios";
import ProtectedService from "../ProtectedService";
import { DetailType } from "@/types/categoryTypes";
import { MainCategory } from "@/types/homeTypes";

export const getCategoryById = async (
  id: number,
  page: number,
  perPage: number
): Promise<{
  data: DetailType;
}> => {
  const response: AxiosResponse<{ data: DetailType }> =
    await ProtectedService.get(
      `/all-categories/${id}?per_page=${perPage}&page=${page}`
    );

  return response.data;
};

export const getByMainCategoryId = async (
  id: number
): Promise<{
  data: MainCategory;
}> => {
  const response: AxiosResponse<{ data: MainCategory }> =
    await ProtectedService.get(`/main-category/${id}`);

  return response.data;
};
