import { useEffect, useState } from 'react';
import { SITE } from '../siteConfig';

const hideFrom = new Date(SITE.grandOpening.hideFrom).getTime();

// Opening date as text, e.g. "Saturday 17 October" and "Sat 17 Oct"
const openingDay = new Date(`${SITE.grandOpening.date}T12:00:00+11:00`);
const fmt = (opts: Intl.DateTimeFormatOptions) => {
  const parts = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Sydney', ...opts }).formatToParts(openingDay);
  const get = (type: string) => (parts.find(p => p.type === type)?.value ?? '').replace(/[.,]/g, '');
  return `${get('weekday')} ${get('day')} ${get('month')}`;
};
export const OPENING_DATE_LONG = fmt({ weekday: 'long', day: 'numeric', month: 'long' });
export const OPENING_DATE_SHORT = fmt({ weekday: 'short', day: 'numeric', month: 'short' });

// Today's date in Sydney as YYYY-MM-DD, regardless of the visitor's timezone
const sydneyToday = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Sydney' }).format(new Date());

function countdownLabel() {
  const days = Math.round(
    (Date.parse(SITE.grandOpening.date) - Date.parse(sydneyToday())) / 86_400_000,
  );
  if (days <= 0) return "It's today!";
  if (days === 1) return 'Tomorrow!';
  return `${days} days to go`;
}

// Whether the grand opening promo is still running, plus its countdown text.
// Re-checks every minute so the countdown ticks over and everything
// disappears at midnight even if the page is left open.
export function useGrandOpening() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const active = now < hideFrom;
  return { active, label: active ? countdownLabel() : '' };
}
