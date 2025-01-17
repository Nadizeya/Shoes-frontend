import axios from "axios";

// const BASE_URL = "https://66ab727f636a4840d7cab5a1.mockapi.io/api";
export const BASE_URL = "https://nadiyoonhtike.com/";

const baseService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseService;
