import axios from "axios";
import router from "@/plugins/router";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
})

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      const currentRoute = router.currentRoute.value;
      if (currentRoute.path !== "/login" && currentRoute.path !== "/register") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      }
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;
