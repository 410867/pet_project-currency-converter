import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_RATES_URL,
  timeout: 10000,
});
