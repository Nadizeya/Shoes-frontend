import { lazy } from "react";

// public pages
export const LazyLogin = lazy(() => import("@/pages/auth/Login"));
export const LazyRegister = lazy(() => import("@/pages/auth/Register"));
export const LazyChangePassword = lazy(
  () => import("@/pages/auth/ChangePassword")
);
export const LazyOtpValidate = lazy(() => import("@/pages/auth/OtpValidation"));
export const LazyResetPassword = lazy(
  () => import("@/pages/auth/ResetPassword")
);
export const LazySuccess = lazy(() => import("@/pages/auth/Success"));
export const LazyWelcome = lazy(() => import("@/pages/welcome"));
export const LazyProducts = lazy(() => import("@/pages/products"));
export const LazyProductDetails = lazy(() => import("@/pages/productDetails"));
export const LazyCategory = lazy(() => import("@/pages/categories"));
export const LazyCategoryDetails = lazy(() => import("@/pages/categoryDetail"));
export const LazyBrand = lazy(() => import("@/pages/brands"));
export const LazyBrandDetails = lazy(() => import("@/pages/brandDetail"));
export const LazyHome = lazy(() => import("@/pages/home"));
export const LazyCreateProfile = lazy(
  () => import("@/pages/auth/CreateProfile")
);
export const LazyLoveList = lazy(() => import("@/pages/loves"));
export const LazyOrderList = lazy(() => import("@/pages/order"));
export const LazyOrderDetail = lazy(() => import("@/pages/orderDetail"));

// private pages (add your private page imports here as needed)
export const LazyProfile = lazy(() => import("@/pages/profile"));
// export const LazyWishList = lazy(() => import("@/pages/wishList"));
export const LazyCheckOut = lazy(() => import("@/pages/checkout"));
