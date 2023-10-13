import axios from "axios";
import { BASE_URL } from "../config";
//const BASE_URL = `http://localhost:4000/api/v1`;

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});
