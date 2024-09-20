import PublicService from "../PublicService";

export const fetchUsers = async () => {
  const response = await PublicService.get("/comments");

  return response.data;
};
