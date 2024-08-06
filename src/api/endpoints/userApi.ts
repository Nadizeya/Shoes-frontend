import baseService from "../BaseService";

// Fetch all users
export const fetchAllCharacters = async () => {
  const response = await baseService.get("/character");
  return response.data;
};
