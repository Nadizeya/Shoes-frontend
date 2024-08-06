import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/utils/useAuth";

const ProtectedRoutes = ({ redirectPath = "/login" }) => {
  const { authenticated } = useAuth();
  const location = useLocation();

  /*
  Purpose of location
 - after login we will bring user "/" home or the visited page we use
*/
  if (authenticated) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
