import { useQuery } from '@tanstack/react-query';
import { getRate } from '../api/exchange';
import type { CurrencyCode } from '../types/currency';

export function useGetRate(from: CurrencyCode, to: CurrencyCode) {
  const same = from === to;
  
  return useQuery({
    queryKey: ['rate', { from, to }],
    queryFn: () => getRate(from, to),
    enabled: !same,
    staleTime: 1000 * 60 * 10,
  });
}
