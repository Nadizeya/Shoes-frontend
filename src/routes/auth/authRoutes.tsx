import type { AuthRoutes } from "@/types/routes";
import {
  LazyLogin,
  LazyRegister,
  LazyChangePassword,
  LazyResetPassword,
  LazyWelcome,
  LazyOtpValidate,
  LazyCreateProfile,
  LazySuccess,
  LazyRegisterOtp,
} from "../lazy";

const authRoutes: AuthRoutes = [
  { key: "login", path: "/login", element: <LazyLogin /> },
  { key: "register", path: "/register", element: <LazyRegister /> },
  {
    key: "register-otp-validation",
    path: "/register/otp-validation",
    element: <LazyRegisterOtp />,
  },
  {
    key: "change-password",
    path: "/change-password",
    element: <LazyChangePassword />,
  },
  {
    key: "otp-validation",
    path: "/change-password/otp-validation",
    element: <LazyOtpValidate />,
  },
  {
    key: "reset-password",
    path: "/reset-password",
    element: <LazyResetPassword />,
  },
  { key: "welcome", path: "/welcome", element: <LazyWelcome /> },
  {
    key: "create-profile",
    path: "/create-profile",
    element: <LazyCreateProfile />,
  },
  { key: "success", path: "/success", element: <LazySuccess /> },
];

export default authRoutes;
