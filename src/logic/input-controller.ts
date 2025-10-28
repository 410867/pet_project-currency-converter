import { formatFixed2, sanitize2dp } from '../utils/number';
import type { ConverterState, Side } from '../types/BiConverter';

export function onAmountInput(state: ConverterState, side: Side, raw: string): ConverterState {
  const text = sanitize2dp(raw, true);
  
  return side === 'A'
    ? { ...state, aText: text, lastEdited: 'A' }
    : { ...state, bText: text, lastEdited: 'B' };
}

export function onAmountBlur(state: ConverterState, side: Side): ConverterState {
  const key = side === 'A' ? 'aText' : 'bText';
  const v = state[key];

  if (v === '' || v === '.') return state;
  
  const fixed = formatFixed2(v);

  return side === 'A' ? { ...state, aText: fixed } : { ...state, bText: fixed };
}
