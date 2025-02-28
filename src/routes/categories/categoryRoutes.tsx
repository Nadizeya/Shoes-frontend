import { Route } from "@/types/routes";
import {
  LazyCategory,
  LazyCategoryDetails,
  LazyNewCategoryDetails,
} from "../lazy";

export const categoryRoutes: Route[] = [
  {
    key: "mainCategories",
    path: "/main-categories/:maincategoryId",
    element: <LazyCategory />,
  },
  {
    key: "categoryDetails",
    path: "/categories/:categoryId",
    element: <LazyCategoryDetails />,
  },
  {
    key: "newCategoryDetails",
    path: "/new-categories",
    element: <LazyNewCategoryDetails />,
  },
];
