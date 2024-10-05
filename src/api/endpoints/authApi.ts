import PublicService from "../PublicService";

export const postLogin = async ({
  contact,
  password,
}: {
  contact: string;
  password: string;
}) => {
  const response = await PublicService.post("/auth/login", {
    contact,
    password,
  });

  return response.data;
};
