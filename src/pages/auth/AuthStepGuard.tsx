import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Define valid authentication step keys
type AuthStepKey =
  | "changePasswordCompleted"
  | "otpValidated"
  | "resetPasswordCompleted";

// Define Props Type
interface AuthStepGuardProps {
  requiredStep: AuthStepKey;
  redirectPath?: string;
}

const AuthStepGuard: React.FC<AuthStepGuardProps> = ({
  requiredStep,
  redirectPath = "/change-password",
}) => {
  const { authStep } = useAuthGuard(); // ✅ Ensure this reads state properly
  const location = useLocation();

  console.log("AuthStepGuard Check:", authStep); // Debugging

  if (!authStep[requiredStep]) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AuthStepGuard;
