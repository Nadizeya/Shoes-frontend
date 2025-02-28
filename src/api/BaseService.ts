import axios from "axios";

export const BASE_URL =
  import.meta.env.VITE_BASE_URL || "https://fallback-url.com";

const baseService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseService;
