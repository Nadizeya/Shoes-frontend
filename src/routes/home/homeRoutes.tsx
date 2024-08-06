import { Routes } from "@/types/routes";
import { LazyHome } from "../lazy";

export const homeRoutes: Routes = [
  {
    key: "home",
    path: "/",
    element: <LazyHome />,
  },
];
