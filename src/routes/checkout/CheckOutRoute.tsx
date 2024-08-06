import { Route } from "@/types/routes";
import { LazyCheckOut } from "../lazy";

export const checkOutRoutes: Route[] = [
  {
    key: "checkout",
    path: "/checkout",
    element: <LazyCheckOut />,
  },
];
