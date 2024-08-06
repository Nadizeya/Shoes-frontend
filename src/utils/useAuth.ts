import { useNavigate } from "react-router-dom";
import {
  accessTokenState,
  signOutSuccess,
} from "@/store/slices/auth/authSlice";
import { setUser } from "@/store/slices/user/userSlice";
import { useAppSelector, useAppDispatch } from "@/store/hook";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { access_token, signedIn } = useAppSelector(accessTokenState);
  const navigate = useNavigate();

  // this will probably be api fetching
  const login = () => {};

  // this will probably be api fetching
  const register = () => {};

  const handleLogOut = () => {
    dispatch(
      setUser({
        username: "",
        email: "",
        phone: "",
      })
    );
    dispatch(signOutSuccess());
    navigate("/login");
  };

  const logout = () => {
    handleLogOut();
  };

  return {
    authenticated: access_token && signedIn,
    login,
    register,
    logout,
  };
}
