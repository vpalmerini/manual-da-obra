import api from "./api";

export const create = async (id, data) => api.post(`/constructions/${id}/systems`, data);
