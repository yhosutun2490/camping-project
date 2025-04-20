// utils/axiosInstance.ts
import axios from "axios";

// 建立一個 axios instance，並讓每次 request 都帶 cookies
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;