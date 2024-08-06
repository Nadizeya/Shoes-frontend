import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

const baseService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseService;
