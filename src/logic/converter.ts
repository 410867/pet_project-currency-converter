import type { CurrencyCode } from '../types';
import type { ConverterRates, ConverterState } from '../types/BiConverter';
import { parseFloatSafe } from '../utils/number';

export function isSameCurrency(a: CurrencyCode, b: CurrencyCode): boolean {
  return a === b;
}

export function computeNextTexts(
  state: ConverterState,
  rates: ConverterRates,
): Pick<ConverterState, 'aText' | 'bText'> {
  const same = isSameCurrency(state.aCurrency, state.bCurrency);

  if (state.lastEdited === 'A') {
    if (same) return { aText: state.aText, bText: state.aText };
    if (state.aText.endsWith('.')) return { aText: state.aText, bText: state.bText };

    const aNum = parseFloatSafe(state.aText);

    if (aNum == null || rates.rateAB == null) return { aText: state.aText, bText: state.bText };

    return { aText: state.aText, bText: (aNum * rates.rateAB).toFixed(2) };
  } else {
    if (same) return { aText: state.bText, bText: state.bText };
    if (state.bText.endsWith('.')) return { aText: state.aText, bText: state.bText };

    const bNum = parseFloatSafe(state.bText);

    if (bNum == null || rates.rateBA == null) return { aText: state.aText, bText: state.bText };

    return { aText: (bNum * rates.rateBA).toFixed(2), bText: state.bText };
  }
}

export function onCurrencyChange(
  state: ConverterState,
  next: Partial<Pick<ConverterState, 'aCurrency' | 'bCurrency'>>,
  rates: ConverterRates,
): ConverterState {
  const merged: ConverterState = { ...state, ...next };
  const { aText, bText } = computeNextTexts(merged, rates);

  return { ...merged, aText, bText };
}

export function getLoadingFlags(
  a: { isLoading: boolean; isFetching: boolean },
  b: { isLoading: boolean; isFetching: boolean },
) {
  const isLoading = a.isLoading || b.isLoading;
  const isFetching = a.isFetching || b.isFetching;
  const isBusy = isLoading || isFetching;
  
  return { isLoading, isFetching, isBusy };
}
