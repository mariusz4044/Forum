import { number } from "motion";

export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

export function formatShortNumber(num: number): string {
  if (!num) return "0";
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  } else {
    return num.toString();
  }
}

export function formatNumberSpacing(num: number): string {
  return num.toLocaleString("pl-PL");
}
