import api from "./api";

export const login = async (username, password) => api.post("/auth", { username, password });

export const me = async () => api.get("/auth/me");
