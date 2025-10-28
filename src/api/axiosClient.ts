import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_RATES_URL ?? "https://bank.gov.ua/NBUStatService/v1/statdirectory",
  timeout: 10000,
});
