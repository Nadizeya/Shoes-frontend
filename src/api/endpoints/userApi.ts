import { UserT } from "@/types/user";
import ProtectedService from "../ProtectedService";
import { AxiosResponse } from "axios";

export const getUserDetail = async (
  user_id: number
): Promise<{
  data: UserT;
}> => {
  const response: AxiosResponse<{ data: UserT }> = await ProtectedService.get(
    `/user/${user_id}`
  );

  return response.data;
};

export const updateUserDetail = async (
  user_id: number,
  fields: Record<"name" | "email" | "phone" | "address", string>
) => {
  const response = await ProtectedService.put(
    `/user-update/${user_id}`,
    fields
  );

  return response.data;
};
