import ProtectedService from "../ProtectedService";
import { CartResponseType, PaymentDataList } from "@/types/checkOutTypes";
import ScreenshotService from "../ScreenshotService";

export const fetchCartItems = async (): Promise<CartResponseType> => {
  const response = await ProtectedService.get("/add-to-cart/all");
  return response.data;
};

export const fetchPaymentData = async (): Promise<{
  data: PaymentDataList;
}> => {
  const response = await ProtectedService.get("/payment");
  return response.data;
};

export const addOrder = async (data: any) => {
  const response = await ScreenshotService.post(`/orders/create-order`, data, {
    timeout: 5000,
  });
  if (response.status != 200) {
    throw new Error("Problem with fetching");
  }
  return response.data;
};

export const deleteOrder = async (id: number) => {
  const response = await ProtectedService.delete(`/add-to-cart/${id}`);
  if (response.status != 200) {
    throw new Error("Problem with fetching");
  }
  return response.data;
};

// export const removeWishList = async (
//   data: any
// ): Promise<{ data: ProductData }> => {
//   const response = await ProtectedService.post(`/whitelist/remove`, data);
//   if (response.status != 200) {
//     throw new Error("Problem with fetching");
//   }
//   return response.data;
// };
