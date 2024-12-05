import axios from "axios";
import { store } from "@/store";
import { signOutSuccess } from "@/store/slices/auth/authSlice";

const BASE_URL = "http://192.168.1.51:9000/api";

const ProtectedService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const unauthorizedCode = [401];

ProtectedService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

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
