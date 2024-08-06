import { Route } from "@/types/routes";
import { LazyBrandDetails, LazyBrands } from "../lazy";

export const brandRoutes: Route[] = [
  {
    key: "brands",
    path: "/brands",
    element: <LazyBrands />,
  },
  {
    key: "brandDetails",
    path: "/brands/:brandId",
    element: <LazyBrandDetails />,
  },
];
