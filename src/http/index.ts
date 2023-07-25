import { AuthResponse } from "@/models/response/AuthResponse";
import axios from "axios";
export const API_URL = "https://fastapi-9pp3.onrender.com/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${API_URL}/auth/user/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", response.data.access_token);
        return $api.request(originalRequest);
      } catch {}
    }

    throw error;
  }
);

export default $api;
