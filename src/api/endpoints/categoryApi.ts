import { AxiosResponse } from "axios";
import ProtectedService from "../ProtectedService";
import { DetailType } from "@/types/categoryTypes";

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
