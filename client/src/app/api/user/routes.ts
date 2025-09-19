import axios from "axios";

const api = axios.create({
  baseURL: "https://major-project-gfq0.onrender.com/api",
  withCredentials: true,
});

export default api;
