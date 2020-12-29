import { AxiosResponse } from "axios";
import { Construction } from "interfaces/construction.interface";
import api from "./api";

export const list = async (): Promise<AxiosResponse<any>> => {
  return api.get("/constructions");
};

export const create = async (
  data: Construction
): Promise<AxiosResponse<any>> => {
  return api.post("/constructions", data);
};

export const detail = async (id: string): Promise<AxiosResponse<any>> => {
  return api.get(`/constructions/${id}`);
};

export const edit = async (
  id: string,
  data: Construction
): Promise<AxiosResponse<any>> => {
  return api.put(`/constructions/${id}`, data);
};

export const remove = async (id: string): Promise<AxiosResponse<any>> => {
  return api.delete(`/constructions/${id}`);
};
