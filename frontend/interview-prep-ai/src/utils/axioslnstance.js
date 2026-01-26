import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Example BASE_URL = "http://localhost:8000/api"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Attach JWT token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Global response handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // 🔐 Auth errors
      if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/";
        console.error("Unauthorized. Redirecting to login...");
      }

      // 🚦 Rate limit (Groq / Backend limiter)
      else if (status === 429) {
        console.error(
          data?.message || "Too many requests. Please wait and try again."
        );
      }

      // 💥 Server error
      else if (status === 500) {
        console.error(
          data?.message || "Server error. Please try again later."
        );
      }

      // ⚠️ Other API errors
      else {
        console.error(
          "API error:",
          data?.message || error.message
        );
      }

    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    } else if (error.message === "Network Error") {
      console.error("Network error. Is the backend running?");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
