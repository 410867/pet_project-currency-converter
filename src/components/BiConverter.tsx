import { useEffect, useMemo, useState } from "react";
import { Loader2, ArrowRightLeft } from "lucide-react";
import { CURRENCIES } from "../constants/currencies";
import type { CurrencyCode } from "../types";
import { useGetRate } from "../hooks/use-get-rate";

import { computeNextTexts, getLoadingFlags, onCurrencyChange } from "../logic/converter";
import { onAmountBlur, onAmountInput } from "../logic/input-controller";
import type { ConverterState } from "../types/BiConverter";

export default function BiConverter() {
  const [state, setState] = useState<ConverterState>({
    aText: "1.00",
    bText: "0.00",
    aCurrency: "USD",
    bCurrency: "UAH",
    lastEdited: "A",
  });

  const rateAB = useGetRate(state.aCurrency, state.bCurrency);
  const rateBA = useGetRate(state.bCurrency, state.aCurrency);
  const { isBusy, isLoading, isFetching } = getLoadingFlags(rateAB, rateBA);

  const rates = useMemo(
    () => ({ rateAB: rateAB.data?.rate, rateBA: rateBA.data?.rate }),
    [rateAB.data?.rate, rateBA.data?.rate]
  );

  useEffect(() => {
    setState((cur) => ({ ...cur, ...computeNextTexts(cur, rates) }));
  }, [rates, state.aCurrency, state.bCurrency, state.aText, state.bText, state.lastEdited]);

  return (
    <div className="mx-auto max-w-3xl w-full bg-white rounded-2xl shadow p-6 space-y-6">
      <div className="flex flex-row md:flex-column items-center justify-between gap-3">
        {/* A */}
        <div className="flex items-center gap-2">
          <label className="block text-sm font-medium mb-1">From:</label>
          <input
            type="text"
            inputMode="decimal"
            value={state.aText}
            onChange={(e) => setState((s) => onAmountInput(s, "A", e.target.value))}
            onBlur={() => setState((s) => onAmountBlur(s, "A"))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            disabled={isBusy}
          />
          <select
            value={state.aCurrency}
            onChange={(e) =>
              setState((s) => onCurrencyChange(s, { aCurrency: e.target.value as CurrencyCode }, rates))
            }
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            disabled={isBusy}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {isBusy ? (
          <Loader2 className="animate-spin text-slate-500" aria-label="Loading rates" />
        ) : (
          <ArrowRightLeft className="text-slate-600" aria-hidden />
        )}

        {/* B */}
        <div className="flex items-center gap-2">
          <label className="block text-sm font-medium mb-1">To:</label>
          <input
            type="text"
            inputMode="decimal"
            value={state.bText}
            onChange={(e) => setState((s) => onAmountInput(s, "B", e.target.value))}
            onBlur={() => setState((s) => onAmountBlur(s, "B"))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            disabled={isBusy}
          />
          <select
            value={state.bCurrency}
            onChange={(e) =>
              setState((s) => onCurrencyChange(s, { bCurrency: e.target.value as CurrencyCode }, rates))
            }
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            disabled={isBusy}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-slate-600">
        {state.aCurrency === state.bCurrency ? (
          "Currencies are the same (rate = 1)."
        ) : rateAB.isError || rateBA.isError ? (
          "Failed to load rates."
        ) : isLoading ? (
          "Loading rates…"
        ) : isFetching ? (
          "Updating rates…"
        ) : (
          <>1 {state.aCurrency} = {rateAB.data?.rate.toFixed(2)} {state.bCurrency}</>
        )}
      </p>
    </div>
  );
}
