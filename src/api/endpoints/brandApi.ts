import { BrandT } from "@/types/common";
import PublicService from "../PublicService";
import { DetailType } from "@/types/categoryTypes";
import { AxiosResponse } from "axios";
import ProtectedService from "../ProtectedService";

export const getAllBrands = async (): Promise<{
  data: BrandT[];
}> => {
  const response = await PublicService.get("/all-brands");

  return response.data;
};

export const getBrandById = async (
  id: number,
  page: number,
  perPage: number
): Promise<{
  data: DetailType;
}> => {
  const response: AxiosResponse<{ data: DetailType }> =
    await ProtectedService.get(
      `/all-brands/${id}?per_page=${perPage}&page=${page}`
    );

  return response.data;
};
