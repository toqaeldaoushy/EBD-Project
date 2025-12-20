import api from "./client";

export async function registerApi(payload) {
  // payload: { fullName, email, password, phone }
  const res = await api.post("/api/auth/register", payload);
  return res.data;
}

export async function loginApi(payload) {
  // payload: { email, password }
  const res = await api.post("/api/auth/login", payload);
  return res.data; // { message, token }
}
