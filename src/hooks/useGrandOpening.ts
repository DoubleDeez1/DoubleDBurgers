import { useEffect, useState } from 'react';
import { SITE } from '../siteConfig';

const hideFrom = new Date(SITE.grandOpening.hideFrom).getTime();

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
