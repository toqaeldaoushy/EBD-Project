import axios from "axios";

const BASE_URL = "http://localhost:3000/api/auth";

export async function loginApi(credentials) {
  const res = await axios.post(
    `${BASE_URL}/login`,
    credentials
  );

  return res.data;
}

export async function registerApi(userData) {
  const res = await axios.post(
    `${BASE_URL}/register`,
    userData
  );
  return res.data;
}