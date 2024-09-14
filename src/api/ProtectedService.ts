import axios from "axios";
import { store } from "@/store";
import { signOutSuccess } from "@/store/slices/auth/authSlice";

const BASE_URL = "https://rickandmortyapi.com/api";

const ProtectedService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const unauthorizedCode = [401];

ProtectedService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const a = store.getState();
      console.log(a);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ProtectedService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && unauthorizedCode.includes(response.status)) {
      store.dispatch(signOutSuccess());
    }

    return Promise.reject(error);
  }
);
export default ProtectedService;
