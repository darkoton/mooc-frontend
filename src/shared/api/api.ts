import axios from "axios";

import { LS_KEYS } from "@shared/utils/const";
import { useAuthStore } from "@entities/auth";
import { apiBaseUrl } from "@shared/config/envVars";

const getAuthorizationHeader = () => {
  const accessToken = localStorage.getItem(LS_KEYS.ACCESS_TOKEN);
  return accessToken ? `Token ${accessToken}` : undefined;
};

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Accept-Language": localStorage.getItem(LS_KEYS.LOCALE) || "uk",
    Authorization: getAuthorizationHeader(),
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      useAuthStore.getState().setAuth(false);
      localStorage.removeItem(LS_KEYS.ACCESS_TOKEN);
    }

    return Promise.reject(error);
  }
);
