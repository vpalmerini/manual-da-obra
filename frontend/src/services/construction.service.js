import api from "./api";

export const list = async () => api.get("/constructions");
