// services/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:  "https://showup-ninja.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

export default axiosInstance;
