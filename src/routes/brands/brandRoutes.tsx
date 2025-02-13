import { Route } from "@/types/routes";
import { LazyBrand, LazyBrandDetails } from "../lazy";

export const brandRoutes: Route[] = [
  {
    key: "brands",
    path: "/brands",
    element: <LazyBrand />,
  },
  {
    key: "brandDetails",
    path: "/brands/:brandId",
    element: <LazyBrandDetails />,
  },
];
