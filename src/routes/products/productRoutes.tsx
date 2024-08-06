import { Routes } from "@/types/routes";
import { LazyProductDetails, LazyProducts } from "../lazy";

export const productRoutes: Routes = [
  {
    key: "products",
    path: "/products",
    element: <LazyProducts />,
  },
  {
    key: "productsDetails",
    path: "/products/:productId",
    element: <LazyProductDetails />,
  },
];
