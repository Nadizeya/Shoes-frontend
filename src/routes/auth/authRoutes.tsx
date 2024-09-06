import type { Routes } from "@/types/routes";
import {
  LazyLogin,
  LazyRegister,
  LazyChangePassword,
  LazyResetPassword,
  LazyWelcome,
} from "../lazy";

const authRoutes: Routes = [
  {
    key: "login",
    path: "/login",
    element: <LazyLogin />,
  },
  {
    key: "register",
    path: "/register",
    element: <LazyRegister />,
  },
  {
    key: "change-password",
    path: "/change-password",
    element: <LazyChangePassword />,
  },
  {
    key: "reset-password",
    path: "/reset-password",
    element: <LazyResetPassword />,
  },
  {
    key: "welcome",
    path: "/welcome",
    element: <LazyWelcome />,
  },
];

export default authRoutes;
