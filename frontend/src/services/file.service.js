import api from "./api";

export const detail = async (id, nickname, file_id) => api.get(`/constructions/${id}/systems/${nickname}/files/${file_id}`);
