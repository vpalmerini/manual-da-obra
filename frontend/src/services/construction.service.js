import api from "./api";

export const list = async () => api.get("/constructions");

export const create = async (data) => api.post("/constructions", data);

export const detail = async (id) => api.get(`/constructions/${id}`);

export const edit = async (id, data) => api.put(`/constructions/${id}`, data);
