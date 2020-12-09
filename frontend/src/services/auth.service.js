import api from "./api";

const login = async (username, password) => (
  api.post("/auth", { username, password })
);

export default login;
