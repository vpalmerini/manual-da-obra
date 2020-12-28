/* eslint-disable import/no-cycle */
import history from "routes/history";
import routes from "routes/routes";
import api from "./api";

export const login = async (username: string, password: string) => api.post("/auth", { username, password });

export const me = async () => api.get("/auth/me");

export const logout = async (error = false) => {
  history.push({ pathname: routes.LOGIN, state: { logout: true, error } });
  await api.post("/auth/logout");
};
