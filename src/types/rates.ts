export type LatestResponse = {
  base: "UAH";
  date: string;
  rates: Record<string, number>;
};

export type RateResponse = {
  rate: number;
  date: string;
};

export type ConvertResult = {
  date: string;
  rate: number;
  converted: number;
};

export type NbuItem = {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
};
