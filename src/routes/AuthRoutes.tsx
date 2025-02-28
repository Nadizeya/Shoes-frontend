import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import MainLoading from "@/components/shared/MainLoading";
import type { AuthRoutes } from "@/types/routes";
import authRoutes from "./auth/authRoutes";
import AuthStepGuard from "@/pages/auth/AuthStepGuard";

const typedAuthRoutes: AuthRoutes = authRoutes;

const getRouteElement = (key: string) => {
  const route = typedAuthRoutes.find((r) => r.key === key);
  if (!route) {
    throw new Error(`Route with key "${key}" not found in authRoutes`);
  }
  return route.element;
};

const AuthRoutes = () => (
  <Routes>
    {/* Initial authentication pages */}
    {typedAuthRoutes.map((route) => {
      if (
        ["login", "register", "register-otp-validation"].includes(route.key)
      ) {
        return (
          <Route
            key={route.key}
            path={route.path}
            element={
              <Suspense fallback={<MainLoading />}>{route.element}</Suspense>
            }
          />
        );
      }
      return null;
    })}

    {/* Change Password */}
    <Route
      path="/change-password"
      element={
        <Suspense fallback={<MainLoading />}>
          {getRouteElement("change-password")}
        </Suspense>
      }
    />

    {/* OTP Validation - Only accessible if Change Password is completed */}
    <Route
      element={
        <AuthStepGuard
          requiredStep="changePasswordCompleted"
          redirectPath="/change-password"
        />
      }
    >
      <Route
        path="/change-password/otp-validation"
        element={
          <Suspense fallback={<MainLoading />}>
            {getRouteElement("otp-validation")}
          </Suspense>
        }
      />
    </Route>

    {/* Reset Password - Only accessible if OTP is validated */}
    <Route
      element={
        <AuthStepGuard
          requiredStep="otpValidated"
          redirectPath="/change-password/otp-validation"
        />
      }
    >
      <Route
        path="/reset-password"
        element={
          <Suspense fallback={<MainLoading />}>
            {getRouteElement("reset-password")}
          </Suspense>
        }
      />
    </Route>

    {/* Success Page - Only accessible if Reset Password is completed */}
    <Route
      element={
        <AuthStepGuard
          requiredStep="resetPasswordCompleted"
          redirectPath="/reset-password"
        />
      }
    >
      <Route
        path="/success"
        element={
          <Suspense fallback={<MainLoading />}>
            {getRouteElement("success")}
          </Suspense>
        }
      />
    </Route>
  </Routes>
);

export default AuthRoutes;
