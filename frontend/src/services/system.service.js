import api from "./api";

export const create = async (id, data) => api.post(`/constructions/${id}/systems`, data);

export const edit = async (id, nickname, data) => api.put(`/constructions/${id}/systems/${nickname}`, data);

export const get = async (id, nickname) => api.get(`/constructions/${id}/systems/${nickname}`);

export const remove = async (id, nickname) => api.delete(`/constructions/${id}/systems/${nickname}`);
