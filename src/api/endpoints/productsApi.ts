// import { HomeApiResponse, Data } from "@/types/Home/homeTypes";
import { ProductData } from "@/types/productDetailType";
import PublicService from "../PublicService";
import { postAddToCartT } from "@/utils/api hooks/useProductDetail";
import ProtectedService from "../ProtectedService";
import { HomeProducts, ProductDetailProducts } from "@/types/homeTypes";

// Fetch all products
// export const fetchProducts = async (): Promise<{data: }> => {
//   const response = await PublicService.get("/home");
//   if (response.status != 200) {
//     throw new Error("Problem with fetching");
//   }
//   return response.data;
// };

export const fetchProductbyId = async (
  id: number
): Promise<{ data: ProductData }> => {
  const response = await PublicService.get(`/all-products/${id}`);
  if (response.status != 200) {
    throw new Error("Problem with fetching");
  }
  return response.data;
};

export const postAddToCart = async (data: postAddToCartT) => {
  const response = await ProtectedService.post(`/add-to-cart/add`, data);
  if (response.status != 200) {
    throw new Error("Problem with posting");
  }
  return response.data;
};

export const fetchProductsAfterDetail = async (): Promise<{
  data: ProductDetailProducts;
}> => {
  const response = await PublicService.get("/products-after-details");

  return response.data;
};
