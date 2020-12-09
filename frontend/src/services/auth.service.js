import api from "./api";

export const login = async (username, password) => {
  return await api.post("/auth", { username, password });
};