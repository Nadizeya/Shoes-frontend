import { Routes } from "@/types/routes";
import { LazyLoveList } from "../lazy";

export const loveRoutes: Routes = [
  {
    key: "love",
    path: "/love-list",
    element: <LazyLoveList />,
  },
];
