export function sanitize2dp(value: string, keepTrailingDot = true): string {
  let s = value.replace(',', '.').replace(/[^\d.]/g, '');
  const firstDot = s.indexOf('.');

  if (firstDot === -1) return s;

  const before = s.slice(0, firstDot);
  let after = s.slice(firstDot + 1).replace(/\./g, '');

  if (after.length > 2) after = after.slice(0, 2);
  if (keepTrailingDot && value.endsWith('.') && after.length === 0) return `${before}.`;

  return `${before}${after.length ? '.' + after : ''}`;
}

export function formatFixed2(value: string): string {
  const n = parseFloat(value.replace(',', '.'));

  if (Number.isNaN(n)) return '';

  return n.toFixed(2);
}

export function parseFloatSafe(s: string): number | null {
  const n = parseFloat(s);

  return Number.isNaN(n) ? null : n;
}
