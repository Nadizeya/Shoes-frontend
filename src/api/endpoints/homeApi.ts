import { Maincategroies, HomeProducts } from "@/types/homeTypes";
import PublicService from "../PublicService";

export const fetchHome = async (): Promise<{ data: HomeProducts }> => {
  const response = await PublicService.get("/home");

  return response.data;
};

export const fetchMainCategories = async (): Promise<{
  data: Maincategroies;
}> => {
  const response = await PublicService.get("/main-category");

  return response.data;
};
