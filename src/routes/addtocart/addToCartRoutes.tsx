import { Routes } from "@/types/routes";
import { LazyAddToCart } from "../lazy";

export const addToCartRoutes: Routes = [
  {
    key: "add-to-cart",
    path: "/add-to-cart",
    element: <LazyAddToCart />,
  },
];
