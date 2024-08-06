import { Route } from "@/types/routes";
import { LazyWishList } from "../lazy";

export const wishListRoutes: Route[] = [
  {
    key: "wishlist",
    path: "/wishlist",
    element: <LazyWishList />,
  },
];
