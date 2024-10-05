import { HomeApiResponse, Data } from "@/types/Home/homeTypes";
import PublicService from "../PublicService";

// Fetch all products
export const fetchProducts = async (): Promise<HomeApiResponse> => {
  const response = await PublicService.get("/home");
  if (response.status != 200) {
    throw new Error("Problem with fetching");
  }
  return response.data;
};
