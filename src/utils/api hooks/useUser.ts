import { getUserDetail } from "@/api/endpoints/userApi";
import { UserT } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useUserDetail = (id: number) => {
  const query = useQuery({
    queryKey: ["userDetail"],
    queryFn: () => getUserDetail(id),
  });

  return {
    userData: query.data?.data as UserT,
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
  };
};
