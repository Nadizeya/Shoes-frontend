import { useNavigate } from "react-router-dom";
import {
  accessTokenState,
  signInSuccess,
  signOutSuccess,
} from "@/store/slices/auth/authSlice";
import { setUser } from "@/store/slices/user/userSlice";
import { useAppSelector, useAppDispatch } from "@/store/hook";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { token, signedIn } = useAppSelector(accessTokenState);
  const navigate = useNavigate();

  // this will probably be api fetching
  const login = (data: any) => {
    dispatch(signInSuccess(data));
    dispatch(setUser(data));
  };

  // this will probably be api fetching
  const register = () => {};

  const handleLogOut = () => {
    dispatch(
      setUser({
        name: "",
        id: 0,
        role: "",
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
    authenticated: token && signedIn,
    login,
    register,
    logout,
  };
}
