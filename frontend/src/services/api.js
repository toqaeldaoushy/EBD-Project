import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Add token to every request
api.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = "Bearer " + token;
  }
  return request;
});

export default api;

