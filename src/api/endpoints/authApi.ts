import PublicService from "../PublicService";

export const postLogin = async (loginformVal : Record<"email" | "password" , string>) => {
  const response = await PublicService.post("/auth/login", loginformVal);

  return response.data;
};

export const postRegister =async (registerformVal : Record<"email" | "password" | "confoirmPassword" , string>) => {
  const response = await PublicService.post("/auth/register" , registerformVal)

  return response.data
}
