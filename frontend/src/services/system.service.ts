import api from "./api";

export const create = async (id: string, data: any) => {
  api.post(`/constructions/${id}/systems`, data);
};

export const edit = async (id: string, nickname: string, data: any) => {
  api.put(`/constructions/${id}/systems/${nickname}`, data);
};

export const detail = async (id: string, nickname: string) => {
  api.get(`/constructions/${id}/systems/${nickname}`);
};

export const remove = async (id: string, nickname: string) => {
  api.delete(`/constructions/${id}/systems/${nickname}`);
};

export const upload = async (id: string, nickname: string, formData: any) => {
  api.post(`/constructions/${id}/systems/${nickname}/files`, formData, {
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    },
  });
};
