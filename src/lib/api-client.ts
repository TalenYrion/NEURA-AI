/*import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Guard flags to prevent race conditions during concurrent requests
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. If unauthorized (401) and we haven't already retried this exact request
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If a refresh request is already in-flight, queue up subsequent requests
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Hit your refresh token rotation route on your backend API
        await axios.post(
          `${apiClient.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        processQueue(null);
        isRefreshing = false;

        // Re-execute the original request with the fresh session cookie/tokens
        return apiClient(originalRequest);
      } catch (refreshError: any) {
        processQueue(refreshError, null);
        isRefreshing = false;

        const genericMessage =
          refreshError.response?.data?.message ||
          'Session expired. Please log in again.';
        return Promise.reject(new Error(genericMessage));
      }
    }

    // 2. Normal error fallback (Your original logic)
    const message =
      error.response?.data?.message || 'An unexpected network error occurred';
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
*/

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ApiResponseQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}

let isRefreshing = false;
let failedQueue: ApiResponseQueueItem[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 💡 GAP 1: If the refresh endpoint itself fails with a 401, exit immediately.
    // This prevents recursive loops and handles a completely dead session.
    if (originalRequest.url?.includes('/auth/refresh')) {
      console.warn("⚠️ Refresh token is invalid or expired. Routing to logout.");
      isRefreshing = false;
      failedQueue = [];
      return Promise.reject(error);
    }

    // 2. Handle unauthorized errors on standard protected routes
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        console.log(`⏳ Refresh in progress. Queueing request: ${originalRequest.url}`);
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            return apiClient.request(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      console.log("🔄 Access token expired. Initiating token rotation...");

      try {
        // Explicitly calling the refresh endpoint
        const response = await axios.post(
          `${apiClient.defaults.baseURL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // Extract the new access token if passed back via response body
        const newAccessToken = response.data?.accessToken || null;
        
        // 💡 GAP 2: Inject the new token into the headers of the retried request
        if (newAccessToken && originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          // Also set it globally for future instances
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        }

        console.log("✅ Token rotation successful. Flushing waiting queue.");
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Re-execute with updated configurations
        return apiClient.request(originalRequest);
      } catch (refreshError: any) {
console.error("❌ Token rotation failed entirely:", refreshError.response?.status, refreshError.response?.data);        processQueue(refreshError, null);
        isRefreshing = false;

        refreshError.message = refreshError.response?.data?.message || 'Session expired. Please log in again.';
        return Promise.reject(refreshError);
      }
    }

    error.message = error.response?.data?.message || 'An unexpected network error occurred';
    return Promise.reject(error);
  },
);

export default apiClient;
