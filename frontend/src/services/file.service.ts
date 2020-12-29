import { AxiosResponse } from "axios";
import { File } from "interfaces/file.interface";
import api from "./api";

export const detail = async (
  id: string,
  nickname: string,
  file_id: string
): Promise<AxiosResponse<any>> => {
  return api.get(`/constructions/${id}/systems/${nickname}/files/${file_id}`);
};

export const edit = async (
  id: string,
  nickname: string,
  file_id: string,
  data: File
): Promise<AxiosResponse<any>> => {
  return api.put(
    `/constructions/${id}/systems/${nickname}/files/${file_id}`,
    data
  );
};

export const remove = async (
  id: string,
  nickname: string,
  file_id: string
): Promise<AxiosResponse<any>> => {
  return api.delete(
    `/constructions/${id}/systems/${nickname}/files/${file_id}`
  );
};
