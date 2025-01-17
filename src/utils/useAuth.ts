import { useNavigate } from "react-router-dom";
import {
  accessTokenState,
  signInSuccess,
  signOutSuccess,
} from "@/store/slices/auth/authSlice";
import { setRegister, setUser } from "@/store/slices/user/userSlice";
import { useAppSelector, useAppDispatch } from "@/store/hook";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { token, signedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // this will probably be api fetching
  const login = (data: any) => {
    dispatch(signInSuccess(data));
    dispatch(setUser(data));
  };

  const register = (data: any) => {
    dispatch(signInSuccess(data));
    dispatch(setRegister(data));
  };

  const handleLogOut = () => {
    dispatch(
      setUser({
        name: "",
        id: 0,
        role: "",
        email: "",
        phone: "",
        order_count: 0,
        whilist_count: 0,
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
