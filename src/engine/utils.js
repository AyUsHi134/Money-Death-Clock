import { MONTHS_IN_YEAR } from "./constants";

export function annualToMonthlyRate(annualRate) {
  return annualRate / MONTHS_IN_YEAR;
}

export function toNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}
