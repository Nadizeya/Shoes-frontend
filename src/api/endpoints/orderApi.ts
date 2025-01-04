import { AxiosResponse } from "axios";
import ProtectedService from "../ProtectedService";
import { DetailedOrder, Order } from "@/types/orderTypes";

export const getOrderHistory = async (
  user_id: number
): Promise<{
  data: Order[];
}> => {
  const response: AxiosResponse<{ data: Order[] }> =
    await ProtectedService.post("/orders/user-order", { user_id });

  return response.data;
};

export const getOrderDetail = async (
  user_id: number,
  orderId: number
): Promise<{
  data: DetailedOrder;
}> => {
  const response: AxiosResponse<{ data: DetailedOrder }> =
    await ProtectedService.post(`/orders/user-order-details/${orderId}`, {
      user_id,
    });

  return response.data;
};
// export const addToWishList = async (
//   data: any
// ): Promise<{ data: ProductData }> => {
//   const response = await ProtectedService.post(`/whitelists/add`, data);
//   if (response.status != 200) {
//     throw new Error("Problem with fetching");
//   }
//   return response.data;
// };

// export const removeWishList = async (
//   data: any
// ): Promise<{ data: ProductData }> => {
//   const response = await ProtectedService.post(`/whitelists/remove`, data);
//   if (response.status != 200) {
//     throw new Error("Problem with fetching");
//   }
//   return response.data;
// };
