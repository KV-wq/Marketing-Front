import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const userAuthApi = axios.create({
  baseURL: `${API_URL}/user-auth`,
});

userAuthApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("userAccessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

userAuthApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return userAuthApi(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("userRefreshToken");
        if (!refreshToken) {
          processQueue(new Error("No refresh token"), null);
          isRefreshing = false;
          localStorage.removeItem("userAccessToken");
          localStorage.removeItem("user");
          return Promise.reject(error);
        }
        const { data } = await axios.post(`${API_URL}/user-auth/refresh`, {
          refreshToken,
        });

        localStorage.setItem("userAccessToken", data.accessToken);
        if (data.newRefreshToken) {
          localStorage.setItem("userRefreshToken", data.newRefreshToken);
        }

        processQueue(null, data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return userAuthApi(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("userAccessToken");
        localStorage.removeItem("userRefreshToken");
        localStorage.removeItem("user");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default userAuthApi;
