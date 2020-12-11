import api from "./api";

export const list = async () => api.get("/constructions");

export const create = async (data) => api.post("/constructions", data);
