export type GetAllResponse<T> = {
  status: number;
  message?: string;
  data: T;
};
