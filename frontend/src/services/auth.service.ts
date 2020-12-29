/* eslint-disable import/no-cycle */
import { AxiosResponse } from "axios";

import history from "routes/history";
import routes from "routes/routes";
import api from "./api";

export const login = (
  username: string,
  password: string
): Promise<AxiosResponse<any>> => {
  return api.post("/auth", { username, password });
};

export const me = async (): Promise<AxiosResponse<any>> => api.get("/auth/me");

export const logout = (error = false): void => {
  history.push({ pathname: routes.LOGIN, state: { logout: true, error } });
  api.post("/auth/logout");
};
