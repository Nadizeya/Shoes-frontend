import PublicService from "../PublicService";

export const fetchHome = async () => {
  const response = await PublicService.get("/home");

  return response.data;
};
