import { Route } from "@/types/routes";
import { LazyCategory, LazyCategoryDetails } from "../lazy";

export const categoryRoutes: Route[] = [
  {
    key: "categories",
    path: "/categories",
    element: <LazyCategory />,
  },
  {
    key: "categoryDetails",
    path: "/categories/:categoryId",
    element: <LazyCategoryDetails />,
  },
];
