import api from "./api";

export const detail = async (id, nickname, file_id) => api.get(`/constructions/${id}/systems/${nickname}/files/${file_id}`);

export const edit = async (id, nickname, file_id, data) => api.put(`/constructions/${id}/systems/${nickname}/files/${file_id}`, data);
