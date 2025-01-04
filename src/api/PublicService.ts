import axios from "axios";

// const BASE_URL = "http://localhost:8000/api/v1";
// const BASE_URL = "http://192.168.1.33:8000/api/";
const BASE_URL = "https://nadiyoonhtike.com/api/";

// Create an Axios instance for public requests
const PublicService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default PublicService;
