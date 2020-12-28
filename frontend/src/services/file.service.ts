import api from "./api";

export const detail = async (id: string, nickname: string, file_id: string) => api.get(`/constructions/${id}/systems/${nickname}/files/${file_id}`);

export const edit = async (id: string, nickname: string, file_id: string, data: any) => api.put(`/constructions/${id}/systems/${nickname}/files/${file_id}`, data);

export const remove = async (id: string, nickname: string, file_id: string) => api.delete(`/constructions/${id}/systems/${nickname}/files/${file_id}`);
