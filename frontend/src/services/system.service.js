import api from "./api";

export const create = async (id, data) => api.post(`/constructions/${id}/systems`, data);

export const edit = async (id, nickname, data) => api.put(`/constructions/${id}/systems/${nickname}`, data);

export const detail = async (id, nickname) => api.get(`/constructions/${id}/systems/${nickname}`);

export const remove = async (id, nickname) => api.delete(`/constructions/${id}/systems/${nickname}`);

export const upload = async (id, nickname, formData) => api.post(`/constructions/${id}/systems/${nickname}`, formData, {
  headers: {
    "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
  },
});
