import { client } from "@/services/client";

export async function sendCode(codeSnippet: string, language: string) {
  const res = await client.post("/api/buggy", {
    codeSnippet,
    language,
  });
  return res.data;
}
