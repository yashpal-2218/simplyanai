import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? process.env.WEBSITE_URL
    : "http://localhost:3000";

export const client = axios.create({
  baseURL: url,
});
