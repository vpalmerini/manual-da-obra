import api from "./api";

export const create = async (id: string, data: any) => {
  return api.post(`/constructions/${id}/systems`, data);
};

export const edit = async (id: string, nickname: string, data: any) => {
  return api.put(`/constructions/${id}/systems/${nickname}`, data);
};

export const detail = async (id: string, nickname: string) => {
  return api.get(`/constructions/${id}/systems/${nickname}`);
};

export const remove = async (id: string, nickname: string) => {
  return api.delete(`/constructions/${id}/systems/${nickname}`);
};

export const upload = async (id: string, nickname: string, formData: any) => {
  return api.post(`/constructions/${id}/systems/${nickname}/files`, formData, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    },
  });
};
