/* eslint-disable import/no-cycle */
import axios from "axios";
import { logout } from "./auth.service";

const { REACT_APP_API_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_API_URL,
  responseType: "json",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    const originalRequest = error.config;
    if (error.response && error.response.data && error.response.data.message === "jwt expired") {
      if (originalRequest.url !== "/auth/refresh") {
        return new Promise((resolve, reject) => {
          api
            .post("/auth/refresh")
            .then(() => resolve(axios(originalRequest)))
            .catch((err) => {
              reject(err);
            });
        });
      }
      return logout(true);
    }
    return new Promise((resolve, reject) => {
      reject(error);
    });
  },
);

export default api;
