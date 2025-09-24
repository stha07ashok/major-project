import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// Add request interceptor to include auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    console.log("Token from localStorage:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization header set:", config.headers.Authorization);
    } else {
      console.log("No token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
