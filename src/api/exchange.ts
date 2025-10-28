import { axiosClient } from "./axiosClient";
import type { CurrencyCode } from "../types/currency";
import type { LatestResponse, NbuItem, RateResponse } from "../types/rates";

export async function getLatest(): Promise<LatestResponse> {
  const { data } = await axiosClient.get<NbuItem[]>("/exchange?json");
  const date = data?.[0]?.exchangedate?.split(".").reverse().join("-") ?? new Date().toISOString().slice(0, 10);
  const rates: Record<string, number> = {};

  for (const item of data) rates[item.cc] = item.rate;

  return { base: "UAH", date, rates };
}

export async function getRate(from: CurrencyCode, to: CurrencyCode): Promise<RateResponse> {
  if (from === to) return { rate: 1, date: new Date().toISOString().slice(0, 10) };

  const latest = await getLatest();
  const uahPerFrom = from === "UAH" ? 1 : latest.rates[from];
  const uahPerTo   = to   === "UAH" ? 1 : latest.rates[to];

  if ((from !== "UAH" && !uahPerFrom) || (to !== "UAH" && !uahPerTo)) {
    throw new Error(`No rate for ${from} or ${to} in NBU feed`);
  }

  const rate = from === "UAH" ? 1 / uahPerTo : to === "UAH" ? uahPerFrom : uahPerFrom / uahPerTo;
  
  return { rate, date: latest.date };
}
