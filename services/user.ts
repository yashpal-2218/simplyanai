import { client } from "@/services/client";

export async function loginUser(formData: {}) {
  const res = await client.post("/api/user/login", formData);
  return res;
}

export async function logoutUser() {
  const res = await client.get("/api/user/logout");

  return res;
}

export async function signupUser(formData: {}) {
  const res = await client.post("/api/user/signup", formData);
  return res;
}
