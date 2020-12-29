import api from "./api";

export const list = async () => api.get("/constructions");

export const create = async (data: any) => api.post("/constructions", data);

export const detail = async (id: string) => api.get(`/constructions/${id}`);

export const edit = async (id: string, data: any) => {
  api.put(`/constructions/${id}`, data);
};

export const remove = async (id: string) => api.delete(`/constructions/${id}`);
