import { client } from "@/services/client";
export const uploadPDF = async (formData: object, config: object) => {
  const res = await client.post(
    "api/chatwithdoc/upload-file",
    formData,
    config
  );
  return res;
};

export const sendQuery = async (query: string, fileName: string) => {
  const res = await client.post("api/chatwithdoc/chat", {
    query: query,
    fileName: fileName,
  });
  return res.data;
};
