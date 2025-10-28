import { useGetRate } from '../hooks/use-get-rate';

export default function HeaderRates() {
  const usdUah = useGetRate('USD', 'UAH');
  const eurUah = useGetRate('EUR', 'UAH');

  return (
    <header className="w-full bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Currency Converter</h1>

        <div className="flex items-center gap-4 text-sm">
          <RatePill
            label="USD/UAH"
            loading={usdUah.isFetching}
            error={usdUah.isError}
            value={usdUah.data?.rate}
            date={usdUah.data?.date}
          />
          <RatePill
            label="EUR/UAH"
            loading={eurUah.isFetching}
            error={eurUah.isError}
            value={eurUah.data?.rate}
            date={eurUah.data?.date}
          />
        </div>
      </div>
    </header>
  );
}

function RatePill({
  label,
  loading,
  error,
  value,
}: {
  label: string;
  loading?: boolean;
  error?: boolean;
  value?: number;
  date?: string;
}) {
  return (
    <div className="rounded-full border border-slate-300 px-3 py-1 bg-slate-50">
      {error ? (
        <span className="text-red-600">{label}: error</span>
      ) : loading ? (
        <span className="text-slate-500">{label}: …</span>
      ) : (
        <span className="font-medium">
          {label}: {value?.toFixed(2)}
        </span>
      )}
    </div>
  );
}
