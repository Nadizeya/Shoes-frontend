import { Routes } from "@/types/routes";
import { LazyProfile } from "../lazy";

export const profileRoutes: Routes = [
  {
    key: "profile",
    path: "/profile",
    element: <LazyProfile />,
  },
];
