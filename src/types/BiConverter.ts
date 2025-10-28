import type { CurrencyCode } from "./currency";

export type Side = 'A' | 'B';

export type ConverterState = {
  aText: string;
  bText: string;
  aCurrency: CurrencyCode;
  bCurrency: CurrencyCode;
  lastEdited: Side;
};

export type ConverterRates = {
  rateAB?: number;
  rateBA?: number;
};