import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

export const useApiGet = <T>(
  key: string[],
  fn: () => Promise<T>,
  options?: any
): UseQueryResult<T> =>
  useQuery<T>({
    queryKey: key,
    queryFn: fn,
    ...options,
  });

export const useApiSend = (fn, success, error, invalidateKey, options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: (data) => {
      invalidateKey &&
        invalidateKey.forEach((key) => {
          queryClient.invalidateQueries(key);
        });
      success && success(data);
    },
    onError: error,
    retry: 2,
    ...options,
  });
};
